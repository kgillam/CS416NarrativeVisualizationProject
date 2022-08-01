# CS416NarrativeVisualizationProject

## Review Criteria Essay

### Messaging
This narrative visualization is trying to communicate the health benefits of breastfeeding, and introduce some of the
factors that affect breastfeeding rates across the country. It allows the user to visually explore how breastfeeding 
rates vary by state, demographic groups, and the intersection of several factors. Breastfeeding has significant benefits
for both the lactating parent and the nursing child, but some groups face more barriers getting the support they need. 

### Narrative Structure
My narrative visualization follows the martini glass style. Visually, it looks like a slideshow, but only the second
half of the slides are interactive. The first few slides contain background information on the topic and the source of
the data that the user will interact with later on. After this initial author-driven messaging, there are interactive
slides that allow the user to explore the data on their own.

### Visual Structure
Each of the interactive slides contain similar drop-down menus that allow the user to control the view of the data.
Each scene has 'Question' selector, that will update the scene to show data from that particular survey question.
Some scenes have additional selectors for year or demographic category, that also update the data used to drive the
visualization.

The maps include annotations that point out the regions with the highest and lowest values, that encourages the user to
start exploring and pay attention to regional differences. These annotations update when the user updates the parameters
for the scene. The annotation and tooltip style is kept the same across visualizations for consistency.

The layout includes "previous" and "next" buttons that help the user transition to other scenes. The map color legends
are kept the same between charts for consistency, so that it is easier to interpret the data as the scenes change.

### Scenes
The first 3 slides contain messaging but are not interactive. My 3 scenes are present on the fourth, fifth, and sixth
slides. The scenes are ordered in such a way that mirrors the introduction messaging on slide 2. 

The first scene focuses on differences by region, and each state's value is for the total population of that state,
not broken down by any demographic group. This scene also allows the user to explore changes over time, since the
survey data is available across multiple years

The second and third scenes (fourth and fifth slides) source data from a different survey than the first scene. This
survey had many more questions and demographic information than the first survey, but did not have data for as many
years. 

The second scene transitions to focus on demographic-based data at the national level. Since these are averages for the
demographic groups across the whole nation and not by state, this scene uses a bar chart instead of a map to display
the data.

The third scene (sixth slide) attempts to highlight the intersection of the variables of the two previous slides, by
comparing rates between demographic groups. Some states did not report all survey questions, so there is missing data.
States without data in this scene are greyed out. But for a given question, the user can compare responses between
ethnicities in each state. Some states have more disparity between groups than others. This variation is not apparent
from prior two scenes, and is interesting to explore (despite the missing data).

### Annotations
The maps include annotations that point out the regions with the highest and lowest values, that encourages the user to
start exploring and pay attention to regional differences. These annotations update when the user updates the parameters
for the scene. 

As a user brings their mouse towards the annotations and over the map, they will notice a tooltip that displays the
value for each state as they hover over it. The annotation helps communicate that this info is available, but only the
minimum and the maximum are displayed initially to reduce clutter. The annotation and tooltip style is kept the same
across visualizations for consistency.

### Parameters
The narrative visualization's main parameter is the current_page parameter. This parameter drives the transitions
between scenes, and dictates which 'page' content is currently being displayed. This parameter is not directly visible
to the user, but updates when they advance between slides with the 'previous' and 'next' buttons.

The secondary parameters are the drop-down selectors in each scene. These parameters are used to update the state of the
current scene and load data for new survey questions.

### Triggers
The current page parameter is updated by the 'previous' and 'next' buttons next to the slides. The 'previous' button
is not visible when viewing the first slide, since there is no slide previous to the first slide. Similarily, the 'next'
button does not display when the user is viewing the sixth slide, since this is the last slide. Updating the button
visibility in this way avoids confusing the user, by only giving affordances for the options that are available from
the current state.

The secondary triggers controlling the scenes are the drop-down selection boxes. Each selection box has a label nearby
it such as 'Select Survey Question:' to communicate to the viewer what that selector is for. When there is an update to
any one of these selectors, an updated parameterized query is sent to the CDC APIs to load data pertaining to the
selected inputs. Then, the entire scene is cleared and redrawn.

## References:
https://www.cdc.gov/breastfeeding/about-breastfeeding/why-it-matters.html

https://www.cdc.gov/breastfeeding/data/facts.html

https://www.womenshealth.gov/its-only-natural/addressing-breastfeeding-myths/incredible-facts

## Data Sources:
https://chronicdata.cdc.gov/Maternal-Child-Health/CDC-PRAMStat-Data-for-2011/ese6-rqpq

https://chronicdata.cdc.gov/Nutrition-Physical-Activity-and-Obesity/Nutrition-Physical-Activity-and-Obesity-National-I/8hxn-cvik

