export const sample =
  'docker run --name web -p 8080:80 -e MODE=local -v ./html:/usr/share/nginx/html:ro --restart unless-stopped nginx:alpine';
