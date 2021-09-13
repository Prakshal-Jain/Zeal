# Zeal

## What is Zeal?
Zeal is a teammate and resource finding tool.

Imagine you are joining an event that requires you to create a team, and you feel- “Oh GOD! I really hope I don’t get random bad teammates. I really want to perform well!”, or you have an amazing idea and you are so excited and full of zeal to work on it, but for that, you either need to find team members who already know the skills to execute the idea or you have to learn the skills. Either way, you would be wasting a lot of time and resources researching the technicalities. Finally, if you work for a startup, one of the major fear is to get the right and best people who can work towards the growth and success of your breakthrough ideas. Relatable?
 
Don’t worry anymore! We have addressed all these issues with Zeal…
We help hackathons and event participants, startups, and individuals with ideas to find worthy team members who can together execute their ideas to reality, instead of wasting precious time researching the technicalities and losing the overall focus. Hence, filling the gap between people with ideas and people who can execute.

## Team:
1. Prakshal Jain
2. Aleena Sheikh
3. Anthony Robert Feliciano
4. Dominic Sciarrino
5. Tommy Chow

## Resources:
https://docs.google.com/document/d/1ohOWhwqaMRoSTwf8QhcVkSYp8GRQHuWnDifakxhE0Wk/edit?usp=sharing

## Setup
1. Backend:
    * Install Virtual Environment: ```pip install pipenv```
    * Start Virtual Environment: ```python3 -m pipenv shell```
    * Go to *zeal_backend* directory: ```cd zeal_backend```
    * Install project dependencies: ```pip install -r requirements.txt```
    * Create Database locally *(db.sqlite3)*: ```python manage.py makemigrations```
    * Apply all changes to Databse *(db.sqlite3)*: ```python manage.py migrate```
    * Running the server: ```python manage.py runserver```

2. Frontend: (no virtual environment needed)
    * Go to *zeal_frontend* directory: ```cd zeal_frontend```
    * Check if you have *npm* installed: ```npm --version```
        * If not, download and install here: https://nodejs.org/en/download/
    * Install all the dependencies: ```npm install```
    * Start the server: ```npm start```

* Additional notes:
    * The variable name on different systems my vary, for example: `py` or `python` or `python3`
    * If you are unable to start or install virtual install, ignore first 2 steps upder *Backend* setup process (point 1 under *Setup* heading).

## Workflow:
    * Get most recent code from a branch: ```git pull origin <branch name>```
Please feel free to add any questions under `Issues` tab in GitHub. I will resolve them ASAP.