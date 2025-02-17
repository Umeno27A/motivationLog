from fastapi import FastAPI, Form, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/submit")
def submit_form(
    temperature: float = Form(...),
    symptoms: str = Form(...),
    sleep: float = Form(...)
):
    return RedirectResponse(url="/timer", status_code=303)

@app.get("/timer")
def read_timer(request: Request):
    return templates.TemplateResponse("timer.html", {"request": request})
