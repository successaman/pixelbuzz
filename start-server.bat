@echo off
echo Starting local development server for PixelBuzz...
start http://localhost:8080/
npx http-server ./ -p 8080
