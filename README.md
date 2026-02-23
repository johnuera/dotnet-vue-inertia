# MyInertiaVue (Dev mode - two terminals)

## Terminal 1 (Vite dev server)
```bash
npm install
npm run dev
```

## Terminal 2 (ASP.NET Core)
```bash
dotnet restore
dotnet run
```

Then open: http://localhost:5000 (or the URL shown by dotnet run)

### Production build
```bash
npm run build
dotnet run
```
The Razor root view will load built assets from wwwroot/manifest.json in non-Development environments.
