import pygame
from settings import SCREEN_WIDTH, SCREEN_HEIGHT
from typing import Tuple, List
from settings import Colors

class UI:
    """
    A class dedicated to rendering various text and 
    user interface elements for the Snake game.

    Responsibilities include:
    - Drawing game menu text
    - Drawing the game-over screen and leaderboard
    - Displaying the current score
    - Handling the font initialization and text rendering process
    """
    def __init__(self):
        """
        Initialize the UI:
        - Initialize pygame fonts
        - Prepare default (medium) and large fonts for varied text sizes
        """
        pygame.font.init()  # Make sure the font module is initialized
        
        # Default font (None uses pygame's default font), size=36
        self.font = pygame.font.Font(None, 36)
        
        # Larger font for headings or titles, size=72
        self.large_font = pygame.font.Font(None, 72)
    
    def draw_text(
        self, 
        surface: pygame.Surface, 
        text: str, 
        pos: Tuple[int, int], 
        color: Tuple[int, int, int] = Colors.WHITE, 
        center: bool = True, 
        font=None
    ) -> None:
        """
        Render text onto a given surface.

        :param surface: The Pygame Surface where the text is drawn
        :param text: The string of text to render
        :param pos: A tuple (x, y) representing the position to draw the text
        :param color: An (R, G, B) tuple for the text color (default=Colors.WHITE)
        :param center: Whether the text should be centered at `pos` (default=True)
        :param font: The font object to use (if None, use self.font)
        """
        # If no font is provided, use the default medium-sized font
        if font is None:
            font = self.font
        
        # Create a surface that displays the text, using the chosen color
        text_surface = font.render(text, True, color)
        
        # Depending on the 'center' argument, place the text appropriately
        if center:
            # Center the text around pos
            text_rect = text_surface.get_rect(center=pos)
        else:
            # Place the text with its top-left corner at pos
            text_rect = text_surface.get_rect(topleft=pos)
        
        # Blit (copy) the text surface onto the main surface
        surface.blit(text_surface, text_rect)
    
    def draw_menu(self, surface: pygame.Surface) -> None:
        """
        Draw the main menu screen:
        - Clears the screen with a black background
        - Shows the game title
        - Displays instructions for starting or quitting
        """
        # Fill the entire screen with black before drawing text
        surface.fill(Colors.BLACK)
        
        # Draw the game title using the large_font at the top third of the screen
        self.draw_text(surface, "SNAKE GAME", (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3), font=self.large_font)
        
        # Draw instructions for starting the game
        self.draw_text(surface, "Press SPACE to Start", (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        
        # Draw instructions for quitting the game
        self.draw_text(surface, "Press Q to Quit", (SCREEN_WIDTH // 2, 2 * SCREEN_HEIGHT // 3))
    
    def draw_game_over(self, surface: pygame.Surface, score: int, leaderboard: List[dict]) -> None:
        """
        Draw the game-over screen, showing the final score and a leaderboard.

        :param surface: The Pygame Surface on which the screen is drawn
        :param score: The player's final score
        :param leaderboard: A list of dictionaries, each containing 
                            {'name': <str>, 'score': <int>} for high scores
        """
        # Clear the screen with black
        surface.fill(Colors.BLACK)
        
        # Game over title
        self.draw_text(surface, "GAME OVER", (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 6), font=self.large_font)
        
        # Show the player's final score
        self.draw_text(surface, f"Score: {score}", (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3 - 50))
        
        # Draw leaderboard heading
        self.draw_text(surface, "High Scores:", (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 100))
        
        # Display each high score entry
        # The 'enumerate' call starts indexing from 1 for a more user-friendly display
        for idx, entry in enumerate(leaderboard, start=1):
            self.draw_text(
                surface,
                f"{idx}. {entry['name']} - {entry['score']}",
                (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 50 + idx * 30)
            )
        
        # Instruction to restart the game
        self.draw_text(surface, "Press SPACE to Restart", (SCREEN_WIDTH // 2, 5 * SCREEN_HEIGHT // 6))
    
    def draw_score(self, surface: pygame.Surface, score: int) -> None:
        """
        Draw the current score in the top-left corner of the screen during gameplay.

        :param surface: The Pygame Surface on which to draw the score
        :param score: The current score to display
        """
        # (70, 20) is chosen as a small offset from the top-left corner (0,0)
        self.draw_text(surface, f"Score: {score}", (70, 20))
