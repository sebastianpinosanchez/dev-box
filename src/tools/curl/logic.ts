import { commandTokens, take } from '@/lib/command';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input, o) => {
  const tokens = commandTokens(input);
  if (tokens.shift() !== 'curl') throw new Error('Start with curl.');
  let method = '',
    url = '',
    body: string | undefined;
  const headers: Record<string, string> = {};
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (['-X', '--request'].includes(token)) method = take(tokens, ++i, token);
    else if (['-H', '--header'].includes(token)) {
      const h = take(tokens, ++i, token);
      const colon = h.indexOf(':');
      if (colon < 1) throw new Error('Headers need a name and colon.');
      headers[h.slice(0, colon).trim()] = h.slice(colon + 1).trim();
    } else if (
      ['-d', '--data', '--data-raw', '--data-binary'].includes(token)
    ) {
      const value = take(tokens, ++i, token);
      if (value.startsWith('@') && token !== '--data-raw')
        throw new Error(
          'File references are not supported. Paste the body instead.',
        );
      body = body === undefined ? value : body + '&' + value;
    } else if (token === '--url') url = take(tokens, ++i, token);
    else if (
      ['-s', '--silent', '-L', '--location', '--compressed'].includes(token)
    )
      continue;
    else if (token.startsWith('-'))
      throw new Error(
        `Unsupported cURL option: ${token}. Supported: -X, -H, -d, --data-raw, --data-binary, --url, -s, -L.`,
      );
    else if (url) throw new Error('Use a single URL.');
    else url = token;
  }
  if (!url) throw new Error('Provide a URL.');
  const parsed = new URL(url);
  if (!['http:', 'https:'].includes(parsed.protocol))
    throw new Error('Only HTTP and HTTPS requests are supported.');
  method = method || (body === undefined ? 'GET' : 'POST');
  if (
    body !== undefined &&
    !Object.keys(headers).some((k) => k.toLowerCase() === 'content-type')
  )
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  const q = JSON.stringify;
  if (o.target === 'Python requests')
    return result(
      `import requests\n\nresponse = requests.request(${q(method)}, ${q(url)},\n    headers=${q(headers)},\n    data=${body === undefined ? 'None' : q(body)})\nprint(response.text)`,
    );
  if (o.target === 'Go')
    return result(
      `package main\n\nimport ("fmt"; "io"; "net/http"; "strings")\n\nfunc main() {\n  req, err := http.NewRequest(${q(method)}, ${q(url)}, strings.NewReader(${q(body || '')}))\n  if err != nil { panic(err) }\n${Object.entries(
        headers,
      )
        .map(([k, v]) => `  req.Header.Set(${q(k)}, ${q(v)})`)
        .join(
          '\n',
        )}\n  response, err := http.DefaultClient.Do(req)\n  if err != nil { panic(err) }\n  defer response.Body.Close()\n  data, err := io.ReadAll(response.Body)\n  if err != nil { panic(err) }\n  fmt.Println(string(data))\n}`,
    );
  if (o.target === 'axios')
    return result(
      `const response = await axios(${q({ url, method, headers, ...(body !== undefined ? { data: body } : {}) }, null, 2)});\nconsole.log(response.data);`,
    );
  return result(
    `const response = await fetch(${q(url)}, ${q({ method, headers, ...(body !== undefined ? { body } : {}) }, null, 2)});\nconsole.log(await response.text());`,
  );
};
