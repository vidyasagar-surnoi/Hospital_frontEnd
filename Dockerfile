FROM nginx
COPY ./dist /usr/share/nginx/html
COPY ./dist/browser /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
