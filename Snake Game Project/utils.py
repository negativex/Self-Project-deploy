"""
utils.py

This module contains various utility functions that support the core logic
of the Snake game, including random position generation, collision detection,
and saving/loading high scores from a JSON file.
"""

import random
from typing import Tuple, List
import json
from settings import SCREEN_WIDTH, SCREEN_HEIGHT, BLOCK_SIZE

def get_random_position(exclude_positions: List[Tuple[int, int]] = None) -> Tuple[int, int]:
    """
    Generate a random position on the grid that does not overlap with any
    excluded positions (e.g., snake body segments, obstacles, etc.).

    :param exclude_positions: A list of (x, y) coordinates where we cannot spawn.
    :return: A random (x, y) position on the grid (multiple of BLOCK_SIZE).
    """
    if exclude_positions is None:
        exclude_positions = []
    
    # Determine the maximum number of blocks along x and y axes
    # so we don't exceed the screen dimensions.
    max_x = (SCREEN_WIDTH - BLOCK_SIZE) // BLOCK_SIZE
    max_y = (SCREEN_HEIGHT - BLOCK_SIZE) // BLOCK_SIZE
    
    while True:
        # Randomly select a block coordinate on the grid
        x = random.randint(0, max_x) * BLOCK_SIZE
        y = random.randint(0, max_y) * BLOCK_SIZE
        
        # Check if the position is not in the excluded list;
        # if it's valid, return it immediately.
        if (x, y) not in exclude_positions:
            return (x, y)

def check_collision(pos1: Tuple[int, int], pos2: Tuple[int, int]) -> bool:
    """
    Check if two positions collide, meaning they occupy the same (x, y) location.

    :param pos1: The first position (x1, y1).
    :param pos2: The second position (x2, y2).
    :return: True if both positions match exactly, False otherwise.
    """
    return pos1 == pos2

def save_high_scores(high_scores: List[dict]) -> None:
    """
    Save high scores to a JSON file called 'high_scores.json'. The file
    will be overwritten with the new data.

    The format of the JSON file is:
    {
        "high_scores": [
            {"name": <player_name>, "score": <score_value>},
            ...
        ]
    }

    :param high_scores: A list of dictionaries representing each high score entry.
                        Example: [{"name": "Player1", "score": 10}, ...]
    """
    # Using 'indent=4' for readability in the generated JSON file.
    with open('high_scores.json', 'w') as f:
        json.dump({'high_scores': high_scores}, f, indent=4)

def load_high_scores() -> List[dict]:
    """
    Load high scores from the 'high_scores.json' file. If the file does not exist
    or is corrupt/unreadable, return an empty list.

    :return: A list of dictionaries, each containing 'name' and 'score' keys.
    """
    try:
        with open('high_scores.json', 'r') as f:
            data = json.load(f)
            # Safely attempt to retrieve 'high_scores' from the data;
            # if it doesn't exist, default to an empty list.
            return data.get('high_scores', [])
    except (FileNotFoundError, json.JSONDecodeError):
        # If the file doesn't exist or can't be parsed, return an empty list.
        return []
