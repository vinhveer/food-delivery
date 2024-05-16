@echo off
REM Khởi tạo frontend
start "Frontend" cmd /c "cd frontend && npm i && npm run dev"

REM Khởi tạo backend
start "Backend" cmd /c "cd backend && npm i && npm run server"

REM Khởi tạo admin
start "Admin" cmd /c "cd admin && npm i && npm run dev"
