import argparse
from bs4 import BeautifulSoup
from typing import List, Tuple


def parse_subscriptions(html: str) -> List[Tuple[str, str]]:
    """Return a list of (channel_name, channel_url) tuples from the HTML."""
    soup = BeautifulSoup(html, "html.parser")
    channels = soup.select("ytd-channel-renderer")
    results = []
    for ch in channels:
        name_tag = ch.select_one("ytd-channel-name yt-formatted-string#text")
        name = name_tag.text.strip() if name_tag else None
        handle_tag = ch.select_one('a.channel-link[href*="/@"]')
        handle = handle_tag['href'].strip() if handle_tag else None
        if name and handle:
            results.append((name, f"https://www.youtube.com{handle}"))
    return results


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract YouTube channel names and URLs from a saved subscriptions HTML file",
    )
    parser.add_argument("file", help="Path to the saved YouTube subscriptions HTML page")
    args = parser.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        html = f.read()

    results = parse_subscriptions(html)
    for name, url in results:
        print(f"{name}\t{url}")


if __name__ == "__main__":
    main()
