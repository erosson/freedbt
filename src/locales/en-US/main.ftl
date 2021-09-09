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

## Journal: freeform writing
## https://freedbt.erosson.org/entries/<n>
## https://freedbt.erosson.org/entries/create/journal

journal-body =
  .placeholder = Dear diary...

## CBT: cognitive behavioral therapy
## https://freedbt.erosson.org/entries/<n>
## https://freedbt.erosson.org/entries/create/cbt

cbt-problem = Automatic thought
cbt-distortions = Select any distortions that apply
cbt-challenge = Challenge the thought
cbt-alternative = Write an alternative thought

cbt-problem-body =
  .placeholder = ex: "The plane might crash"
cbt-challenge-body =
  .placeholder = It might not be true that...
cbt-alternative-body =
  .placeholder = What could we think instead?

cbt-distortion-all-or-nothing = All-or-nothing thinking
cbt-distortion-catastrophizing = Catastrophizing
cbt-distortion-emotional-reasoning = Emotional reasoning
cbt-distortion-fortune-telling = Fortune telling
cbt-distortion-labeling = Labeling
cbt-distortion-magnification-of-the-negative = Magnification of the negative
cbt-distortion-mind-reading = Mind reading
cbt-distortion-minimization-of-the-positive = Minimization of the positive
cbt-distortion-other-blaming = Other-blaming
cbt-distortion-overgeneralization = Overgeneralization
cbt-distortion-self-blaming = Self-blaming
cbt-distortion-should-statements = Should statements

cbt-distortion-example-all-or-nothing = ex: "That was a thorough waste of time"
cbt-distortion-example-catastrophizing = Focusing on the worst possible scenario
cbt-distortion-example-emotional-reasoning = ex: "I feel afraid, so I'll have a panic attack"
cbt-distortion-example-fortune-telling = ex: "I'll get sick at the party"
cbt-distortion-example-labeling = ex: "He's a jerk"
cbt-distortion-example-magnification-of-the-negative = Focusing only on what went wrong
cbt-distortion-example-mind-reading = ex: "I'll bet he hates me now"
cbt-distortion-example-minimization-of-the-positive = Ignoring the good things that happened
cbt-distortion-example-other-blaming = Assigning all the blame to someone else
cbt-distortion-example-overgeneralization = ex: "Everyone will let me down"
cbt-distortion-example-self-blaming = Taking all the blame on yourself
cbt-distortion-example-should-statements = ex: "I should have been better"

## DBT - Emotion Regulation, worksheet 5
## https://freedbt.erosson.org/entries/<n>
## https://freedbt.erosson.org/entries/create/dbt-emotion-regulation-5

dbt-emotion-regulation-5-title = DBT Emotion Regulation - Check the Facts
dbt-emotion-regulation-5-desc =
    It is hard to problem-solve an emotional situation if you don’t have your facts straight. You must
    know what the problem is before you can solve it. This worksheet helps you figure out whether
    it is the event that is causing your emotion, your interpretation of the event, or both. Use your
    mindfulness skills of observing and describing. Observe the facts, and then describe the facts you
    have observed.
dbt-emotion-regulation-5-emotion = What emotion do I want to change?
dbt-emotion-regulation-5-emotion-name = EMOTION NAME:
dbt-emotion-regulation-5-emotion-intensity = Intensity:
dbt-emotion-regulation-5-prompting = What is the PROMPTING EVENT for my emotional reaction?
dbt-emotion-regulation-5-prompting-body = DESCRIBE THE PROMPTING EVENT:
dbt-emotion-regulation-5-prompting-body-desc =
    What happened that led you to have this
    emotion? Who did what to whom? What led up to what? What is it about this event that
    is a problem for you? Be very specific in your answers.
dbt-emotion-regulation-5-prompting-facts = CHECK THE FACTS!
dbt-emotion-regulation-5-prompting-facts-desc =
    Look for extremes and judgments in the way you are describing the prompting event.
    REWRITE the facts, if necessary, to be more accurate.
dbt-emotion-regulation-5-interpretations = What are my INTERPRETATIONS (thoughts, beliefs, etc.) about the facts?
dbt-emotion-regulation-5-interpretations-desc =
    What am I assuming? Am I adding my own interpretations to the description of the
    prompting event?
dbt-emotion-regulation-5-interpretations-facts = CHECK THE FACTS!
dbt-emotion-regulation-5-interpretations-facts-desc =
    List as many other possible interpretations of the facts as you can.
dbt-emotion-regulation-5-interpretations-rewrite =
    REWRITE the facts, if necessary. Try to check the accuracy of your interpretations. If you
    can’t check the facts, write out a likely or a useful (i.e., effective) interpretation.
dbt-emotion-regulation-5-threat = Am I assuming a THREAT?
dbt-emotion-regulation-5-threat-desc =
    What is the threat? What about this event or
    situation is threatening to me? What worrisome consequences or outcomes am I
    expecting?
dbt-emotion-regulation-5-threat-facts = CHECK THE FACTS!
dbt-emotion-regulation-5-threat-facts-desc =
    List as many other possible outcomes as you can, given the facts.
dbt-emotion-regulation-5-threat-rewrite =
    Rewrite the facts if needed. Try to check the accuracy of your expectations. If you
    can’t check out probable outcomes, write out a likely noncatastrophic outcome to
    expect.
dbt-emotion-regulation-5-catastrophe =
    What's the CATASTROPHE, even if the outcome I am worrying about does occur?
dbt-emotion-regulation-5-catastrophe-desc =
    Describe in detail the worst outcome I can reasonably expect.
dbt-emotion-regulation-5-catastrophe-cope = DESCRIBE WAYS TO COPE if the worst does happen.
dbt-emotion-regulation-5-fit = Does my emotion (or its intensity or duration) FIT THE FACTS?
dbt-emotion-regulation-5-fit-rating = Intensity:
dbt-emotion-regulation-5-fit-rating-desc =
    If you are unsure whether your emotion or your emotional intensity fits the facts (for
    example, you give a score of 2, 3, or 4), keep checking the facts. Be as creative as you
    can be; ask others for their opinions; or do an experiment to see if your predictions or
    interpretations are correct.
dbt-emotion-regulation-5-fit-action = Describe what you did to check the facts:
dbt-emotion-regulation-5-cite = Based on <a>DBT Skills Training Handouts and Worksheets</a>, by Marsha M. Linehan
