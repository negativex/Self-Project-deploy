"""
main.py

This module serves as the entry point for the Snake game. 
It initializes the GameEngine and starts the main game loop.
"""

from engine import GameEngine

def main():
    """
    The main function that initializes a GameEngine instance and then 
    runs the game loop until the player quits or closes the window.
    """
    # Create an instance of the GameEngine.
    game = GameEngine()
    
    # Start the main loop of the game. 
    # This loop will continue to run until the game engine sets
    # 'running' to False, or the user closes the game window.
    game.run()

if __name__ == "__main__":
    # Only run main() if this script is executed directly 
    # (as opposed to being imported as a module).
    main()
