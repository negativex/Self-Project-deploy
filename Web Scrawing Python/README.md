# Scraw Web

SCraw Web is a Python script that fetches pages from Wikipedia, extracts content from all wikitable tables, prints them in a fancy grid format, and exports each table to a CSV file. This project is geared towards scraping data of Greek and Latin roots in English.

## Features

- Fetches pages for each alphabet letter from Wikipedia.
- Parses wikitable tables from the pages.
- Formats and prints table data using a fancy grid style.
- Exports table data to individual CSV files (e.g., `table_A_1.csv`).

## Files

- [scraw_web.py](scraw_web.py) - Main script containing the functions [`login_access`](scraw_web.py#L8) and [`main`](scraw_web.py#L49) that drive the program.
- CSV output files (e.g., `table_A_1.csv`, `table_B_1.csv`, etc.) are generated when the script is executed.

## Prerequisites

- Python 3.x
- Required libraries:
  - `requests`
  - `beautifulsoup4`
  - `tabulate`

Install the required libraries using pip:

```sh
pip install requests beautifulsoup4 tabulate

```

## Usage
Run the script using the following command:

```sh
python scraw_web.py
```
The script will iterate through pages corresponding to each letter in the alphabet. It will print the tables in the console and generate CSV files with the scraped data.
