# Investra - Banking & Investment Platform
# PowerShell Launch Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INVESTRA" -ForegroundColor Green
Write-Host "   Banking & Investment Platform" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting application..." -ForegroundColor Yellow
Write-Host ""

# Get the current directory
$currentDir = Get-Location

# Full path to index.html
$indexPath = Join-Path $currentDir "index.html"

# Check if index.html exists
if (Test-Path $indexPath) {
    # Open in default browser
    Start-Process $indexPath
    
    Write-Host "✓ Application opened successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "The application is now running in your default browser." -ForegroundColor White
    Write-Host ""
    Write-Host "Features:" -ForegroundColor Cyan
    Write-Host "  • Banking (Deposit & Withdraw)" -ForegroundColor White
    Write-Host "  • Stock Trading (35+ Indonesian stocks)" -ForegroundColor White
    Write-Host "  • Cryptocurrency Trading (28+ coins)" -ForegroundColor White
    Write-Host "  • Portfolio Management" -ForegroundColor White
    Write-Host "  • Profile & Statistics" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✗ Error: index.html not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this script from the correct directory." -ForegroundColor Yellow
}

Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
