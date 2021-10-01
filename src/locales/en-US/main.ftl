# https://projectfluent.org/

## Terms used throughout the app

title = FreeDBT
page-not-found = Page not found
loading = Loading...
submit = Submit

## Homepage
## https://freedbt.erosson.org/

create-journal = Write a new journal
create-cbt = Write a new CBT
create-dbt-emotion-regulation-5 = Write new DBT - Emotion Regulation (5)
edit-entry = Edit entry #{ $id }
settings-link = Settings

## Settings
## https://freedbt.erosson.org/settings

settings-darkmode-label = Dark Mode:
settings-darkmode-default = Default theme
settings-darkmode-light = Light mode
settings-darkmode-dark = Dark mode
erase-journal-button = Erase all entries
erase-journal-confirm = Are you sure you want to erase your journal? There is no undo.

## Show/edit entries
## https://freedbt.erosson.org/entries/<n>

edit-journal = Edit journal #{ $id }
edit-cbt = Edit CBT #{ $id }
edit-dbt-emotion-regulation-5 = Edit DBT - Emotion Regulation (5) #{ $id }
created-at = Created { DATETIME($date, year: "numeric", day: "numeric", month: "long", hour: "numeric", minute: "numeric", second: "numeric") }
updated-at = Updated { DATETIME($date, year: "numeric", day: "numeric", month: "long", hour: "numeric", minute: "numeric", second: "numeric") }
delete-entry-button = Delete this entry
delete-entry-confirm = Are you sure you want to delete this entry? There is no undo.