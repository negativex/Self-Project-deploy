import requests
from bs4 import BeautifulSoup
from tabulate import tabulate
import csv

def login_access(url, headers, page_identifier):
    """Fetches the given URL, prints the contents of all wikitable tables
    in a fancy grid style, and exports each table's data to a CSV file."""
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch page: {url}, status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, "html.parser")
    tables = soup.find_all("table", class_="wikitable")

    for index, table in enumerate(tables, start=1):
        print(f"\nTable {index}:")
        rows_html = table.find_all("tr")
        if not rows_html:
            print("No rows found in the table.")
            continue

        # Assume the first row is the header row
        table_headers = ["root", "meaning in english", "origin language", "etymology (origin root)", "english examples"]
        # Optional: override headers if you want specific names
        # table_headers = ["root", "meaning in english", "origin language", "etymology (origin root)", "english examples"]

        data_rows = []
        for row in rows_html[1:]:
            cells = [cell.get_text(strip=True) for cell in row.find_all(["th", "td"])]
            if cells:
                data_rows.append(cells)

        if table_headers and data_rows:
            # Print the table using a fancy grid style
            formatted_table = tabulate(data_rows, headers=table_headers, tablefmt="fancy_grid")
            print(formatted_table)
            # Export the table to CSV
            output_filename = f"table_{page_identifier}_{index}.csv"
            with open(output_filename, "w", newline="", encoding="utf-8") as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(table_headers)
                writer.writerows(data_rows)
            print(f"Exported table {index} to {output_filename}")
        else:
            print("No formatted table data available.")
        print("\n" + "=" * 50 + "\n")

def main():
    base_url = "https://en.wikipedia.org/wiki/List_of_Greek_and_Latin_roots_in_English"
    alphabets = [chr(i) for i in range(ord("A"), ord("Z") + 1)]
    
    # Define headers to mimic a common browser user-agent
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    
    for alphabet in alphabets:
        web_url = f"{base_url}/{alphabet}"
        print(f"Fetching page: {web_url}")
        login_access(web_url, headers, alphabet)

if __name__ == "__main__":
    main()