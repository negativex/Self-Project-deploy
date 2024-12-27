import pygame
from enum import Enum

# Screen settings
SCREEN_WIDTH = 800  # The width of the game window, in pixels
SCREEN_HEIGHT = 600  # The height of the game window, in pixels
BLOCK_SIZE = 20  # The size of each grid cell used by the snake, food, and obstacles
FPS = 10  # Frames per second, controlling how fast the game updates

# Colors (RGB)
class Colors:
    """
    A container for various RGB color definitions used throughout the game.
    Each attribute is a tuple representing (Red, Green, Blue).
    """
    BLACK = (0, 0, 0)         # Typically used as the background or "empty" color
    WHITE = (255, 255, 255)   # Useful for text or high-contrast elements
    RED = (255, 0, 0)         # Often used to draw the food in the game
    GREEN = (0, 255, 0)       # Typically used for the snake's body
    BLUE = (0, 0, 255)        # Used to draw obstacles
    YELLOW = (255, 255, 0)    # Optional color for any additional highlights/effects
    ORANGE = (255, 165, 0)    # Optional color for any enhancements or variations

# Game settings
INITIAL_SNAKE_LENGTH = 3  # Initial number of segments the snake will have

class Direction(Enum):
    """
    An enumeration to define possible movement directions for the Snake.
    Each direction has a tuple (dx, dy) representing movement along the x and y axes.
    """
    UP = (0, -1)    # Moves the snake up by one block
    DOWN = (0, 1)   # Moves the snake down by one block
    LEFT = (-1, 0)  # Moves the snake left by one block
    RIGHT = (1, 0)  # Moves the snake right by one block

class GameState(Enum):
    """
    An enumeration to represent the various states the game can be in:
    - MENU: Initial menu screen
    - PLAYING: Main gameplay state
    - PAUSED: State when the game is paused
    - GAME_OVER: End screen after the snake dies
    """
    MENU = 1
    PLAYING = 2
    PAUSED = 3
    GAME_OVER = 4
