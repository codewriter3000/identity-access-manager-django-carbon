$venvPath = "./venv/Scripts/Activate.ps1"
if (Test-Path $venvPath) {
    & $venvPath
} else {
    Write-Host "Virtual environment not found."
}

# You must use this order
python manage.py migrate users
python manage.py migrate permissions
python manage.py migrate roles