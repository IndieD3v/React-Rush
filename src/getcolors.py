import requests
from bs4 import BeautifulSoup

color_list = []
url = "https://htmlcolorcodes.com/color-names/"

page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")

color_names = soup.find_all("td", class_="color-table__cell--name")

for color in color_names:
    color_list.append(color.text.lower())

print(color_list)
