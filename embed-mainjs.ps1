# Script to embed main.js into index.html for guaranteed functionality

Write-Host "🔧 Embedding main.js into index.html..." -ForegroundColor Cyan

# Read files
$indexContent = Get-Content "index.html" -Raw
$mainJsContent = Get-Content "main.js" -Raw

# Add marker to main.js so we know it's loaded
$mainJsWithMarker = "window.mainJsLoaded = true;`n" + $mainJsContent

# Find the inline fallback section and replace it
$pattern = "// Include complete main.js content inline\s+// This is automatically generated from main.js"
$replacement = "// Include complete main.js content inline`n        // This is automatically generated from main.js`n        `n        " + ($mainJsWithMarker -replace "`n", "`n        ")

$newIndexContent = $indexContent -replace $pattern, $replacement

# Save the new index.html
$newIndexContent | Set-Content "index-with-embedded-js.html" -NoNewline

Write-Host "✅ Created: index-with-embedded-js.html" -ForegroundColor Green
Write-Host ""
Write-Host "📊 File sizes:" -ForegroundColor Yellow
Write-Host "  index.html: $((Get-Item 'index.html').Length) bytes"
Write-Host "  main.js: $((Get-Item 'main.js').Length) bytes"
Write-Host "  index-with-embedded-js.html: $((Get-Item 'index-with-embedded-js.html').Length) bytes"
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test index-with-embedded-js.html locally"
Write-Host "  2. If works, rename to index.html"
Write-Host "  3. Commit and push to GitHub"
