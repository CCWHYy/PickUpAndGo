@echo off
set ASPNETCORE_ENVIRONMENT=Development
echo ASPNETCORE_ENVIRONMENT= %ASPNETCORE_ENVIRONMENT%
dotnet ef database update --startup-project PickUpAndGo --verbose
echo Finished... Press any key to continue...
pause > nul