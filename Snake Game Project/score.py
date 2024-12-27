from typing import List
from utils import save_high_scores, load_high_scores

class ScoreManager:
    """
    Manages the player's current score throughout the game and 
    interacts with the Leaderboard to store and retrieve high scores.
    """
    def __init__(self):
        """
        Initialize the ScoreManager with:
        - current_score set to 0
        - a Leaderboard instance for managing high scores
        """
        self.current_score = 0
        self.leaderboard = Leaderboard()

    def increment_score(self, amount: int = 1) -> None:
        """
        Increment the current score by the specified 'amount' 
        and update the leaderboard if necessary.

        :param amount: The amount to increase the current score by (default=1).
        """
        self.current_score += amount
        # Update the leaderboard to see if the new score qualifies as a high score
        self.leaderboard.update_high_scores(self.current_score)
    
    def reset_score(self) -> None:
        """
        Reset the current score to 0.
        Call this method when starting a new game or 
        whenever a score reset is needed.
        """
        self.current_score = 0


class Leaderboard:
    """
    Maintains a list of high scores (name-score pairs),
    ensuring the list does not exceed a specified maximum number of entries.
    """
    def __init__(self, max_entries: int = 10):
        """
        Initialize the Leaderboard:
        - Sets a maximum number of entries (default=10)
        - Loads existing high scores from file (if any)

        :param max_entries: The maximum number of high score entries to keep.
        """
        self.max_entries = max_entries
        self.high_scores = load_high_scores()  # Load existing high scores from JSON if available.
    
    def update_high_scores(self, score: int) -> None:
        """
        Update the leaderboard with a new 'score' if it qualifies as 
        a high score. Prompts for player name and saves updated scores 
        to file.

        :param score: The new score to compare against the existing leaderboard.
        """
        # Check if the leaderboard isn't full OR the new score is higher than the lowest recorded score
        if len(self.high_scores) < self.max_entries or score > self.high_scores[-1]['score']:
            # In a real application, you'd capture user input. Here, we use a placeholder method.
            player_name = self.get_player_name()
            new_entry = {'name': player_name, 'score': score}
            
            # Add the new entry
            self.high_scores.append(new_entry)
            
            # Sort the list in descending order by score and keep only the top 'max_entries'
            self.high_scores = sorted(self.high_scores, key=lambda x: x['score'], reverse=True)[:self.max_entries]
            
            # Persist the updated list of scores to a JSON file
            save_high_scores(self.high_scores)
    
    def get_player_name(self) -> str:
        """
        Retrieve a default player name. 
        In a real game, this could capture actual user input.

        :return: A string representing the player's name.
        """
        return "Player"  # Default name; replace or modify if you have an input system.
    
    def get_high_scores(self) -> List[dict]:
        """
        Retrieve the stored high scores.

        :return: A list of dictionaries containing 'name' and 'score' keys.
        """
        return self.high_scores
