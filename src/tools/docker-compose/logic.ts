import YAML from 'yaml';
import { commandTokens, take } from '@/lib/command';
import { result, type Runner } from '@/lib/tool';
export const run: Runner = (input) => {
  const tokens = commandTokens(input);
  if (tokens.shift() !== 'docker' || tokens.shift() !== 'run')
    throw new Error('Start with docker run.');
  const service: Record<string, unknown> = {};
  let name = 'app';
  const ports: string[] = [],
    volumes: string[] = [],
    environment: string[] = [];
  let image = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token.startsWith('-')) {
      image = token;
      if (i + 1 < tokens.length) service.command = tokens.slice(i + 1);
      break;
    }
    const parts = token.split('=');
    const flag = parts.shift()!;
    const value = () =>
      parts.length ? parts.join('=') : take(tokens, ++i, flag);
    if (['-d', '--detach', '--rm', '-it', '-i', '-t'].includes(flag)) {
      if (flag === '-i' || flag === '-it') service.stdin_open = true;
      if (flag === '-t' || flag === '-it') service.tty = true;
      continue;
    }
    if (flag === '--name') {
      name = value();
      service.container_name = name;
    } else if (['-p', '--publish'].includes(flag)) ports.push(value());
    else if (['-v', '--volume'].includes(flag)) volumes.push(value());
    else if (['-e', '--env'].includes(flag)) environment.push(value());
    else if (flag === '--restart') service.restart = value();
    else if (['-w', '--workdir'].includes(flag)) service.working_dir = value();
    else if (['-u', '--user'].includes(flag)) service.user = value();
    else if (flag === '--network') service.network_mode = value();
    else if (flag === '--entrypoint') service.entrypoint = value();
    else
      throw new Error(
        `Unsupported docker run option ${flag}. No options are silently discarded.`,
      );
  }
  if (!image) throw new Error('Provide an image.');
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(name))
    throw new Error('Invalid service name.');
  service.image = image;
  if (ports.length) service.ports = ports;
  if (volumes.length) service.volumes = volumes;
  if (environment.length) service.environment = environment;
  const named = volumes
    .map((v) => v.split(':')[0])
    .filter(
      (v) => !v.startsWith('.') && !v.startsWith('/') && !v.includes('\\'),
    );
  return result(
    YAML.stringify({
      services: { [name]: service },
      ...(named.length
        ? { volumes: Object.fromEntries(named.map((v) => [v, {}])) }
        : {}),
    }),
  );
};
