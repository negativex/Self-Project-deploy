from typing import Tuple, List
from settings import SCREEN_WIDTH, SCREEN_HEIGHT, BLOCK_SIZE, INITIAL_SNAKE_LENGTH
from utils import get_random_position, check_collision
from settings import Direction

class Snake:
    """
    Represents the Snake entity in the game:
    - Manages the snake's position, direction, movement, and growth mechanics.
    """
    def __init__(self):
        """
        Initialize the snake by calling the reset method to set its starting position,
        direction, and growth status.
        """
        self.reset()
    
    def reset(self) -> None:
        """
        Reset the snake to its initial state:
        - Places the snake at the center of the screen (rounded to the block grid).
        - Sets the initial direction to RIGHT.
        - Sets the grow_pending to INITIAL_SNAKE_LENGTH - 1, meaning the snake 
          will grow until it reaches the initial length.
        """
        # Calculate a center position in multiples of BLOCK_SIZE
        start_x = (SCREEN_WIDTH // 2) // BLOCK_SIZE * BLOCK_SIZE
        start_y = (SCREEN_HEIGHT // 2) // BLOCK_SIZE * BLOCK_SIZE
        
        # Start with one segment in the list of positions
        self.positions = [(start_x, start_y)]
        
        # Default direction is RIGHT
        self.direction = Direction.RIGHT
        
        # The snake will grow for (INITIAL_SNAKE_LENGTH - 1) moves
        self.grow_pending = INITIAL_SNAKE_LENGTH - 1
    
    def move(self) -> None:
        """
        Move the snake one step in the current direction:
        - The head is calculated based on direction and block size, wrapping around the screen edges.
        - If grow_pending > 0, the snake grows by not removing the tail.
        - Otherwise, the tail is removed (pop) from the list of positions.
        """
        # Current head position
        head_x, head_y = self.positions[0]
        
        # Direction vectors are stored as a tuple (dx, dy) in Direction Enum
        dx, dy = self.direction.value
        
        # Compute new head position with wrap-around (modulus operation)
        new_head = (
            (head_x + dx * BLOCK_SIZE) % SCREEN_WIDTH,
            (head_y + dy * BLOCK_SIZE) % SCREEN_HEIGHT
        )
        
        # Insert the new head at the front of the snake
        self.positions.insert(0, new_head)
        
        # If we still need to grow, decrement grow_pending instead of removing the tail
        if self.grow_pending > 0:
            self.grow_pending -= 1
        else:
            # Remove the last segment to simulate movement
            self.positions.pop()
    
    def grow(self) -> None:
        """
        Trigger snake growth by incrementing the grow_pending counter:
        - The snake won't remove its tail on the next moves until grow_pending is back to 0.
        """
        self.grow_pending += 1
    
    def check_self_collision(self) -> bool:
        """
        Check if the snake has collided with itself:
        - True if the head's position matches any other part of its body.
        """
        # The head is positions[0]; if it appears anywhere else in positions, 
        # that means self-collision
        return self.positions[0] in self.positions[1:]


class Food:
    """
    Represents the Food entity in the game:
    - Responsible for generating and respawning the food at valid positions.
    """
    def __init__(self, snake_positions: List[Tuple[int, int]], obstacle_positions: List[Tuple[int, int]] = None):
        """
        Initialize the food position:
        - Exclude the current positions of the snake and any obstacles.
        
        :param snake_positions: List of positions occupied by the snake
        :param obstacle_positions: List of positions occupied by obstacles
        """
        if obstacle_positions is None:
            obstacle_positions = []
        
        # Generate a random valid position for the food
        self.position = get_random_position(exclude_positions=snake_positions + obstacle_positions)
    
    def respawn(self, exclude_positions: List[Tuple[int, int]]) -> None:
        """
        Respawn the food in a new random position, excluding given positions.
        
        :param exclude_positions: Positions where food cannot spawn 
                                  (snake body + obstacle locations).
        """
        self.position = get_random_position(exclude_positions=exclude_positions)


class Obstacle:
    """
    Represents a single obstacle on the board:
    - Holds only its position.
    """
    def __init__(self, position: Tuple[int, int]):
        """
        Initialize the obstacle with a given position.

        :param position: The (x, y) coordinate for the obstacle.
        """
        self.position = position


class Obstacles:
    """
    Manages a collection of Obstacles:
    - Generates a specified number of obstacles at random positions.
    - Ensures they do not spawn on excluded positions (e.g., snake start).
    """
    def __init__(self, number_of_obstacles: int = 10):
        """
        Initialize the Obstacles manager:
        - Creates an empty list of obstacles.
        - Immediately calls generate_obstacles() to fill it.
        
        :param number_of_obstacles: Desired number of obstacles to generate.
        """
        self.number_of_obstacles = number_of_obstacles
        self.obstacle_list: List[Obstacle] = []
        
        # Populate the obstacle list
        self.generate_obstacles()
    
    def generate_obstacles(self) -> None:
        """
        Generate obstacles at random positions while avoiding the center start location:
        - A list of exclude_positions is maintained to ensure each new obstacle
          does not overlap previously placed obstacles.
        """
        # Initially, exclude the center where the snake starts
        exclude_positions = []
        start_x = (SCREEN_WIDTH // 2) // BLOCK_SIZE * BLOCK_SIZE
        start_y = (SCREEN_HEIGHT // 2) // BLOCK_SIZE * BLOCK_SIZE
        exclude_positions.append((start_x, start_y))
        
        # Keep generating obstacles until we reach the desired count
        while len(self.obstacle_list) < self.number_of_obstacles:
            pos = get_random_position(exclude_positions)
            self.obstacle_list.append(Obstacle(pos))
            # Add the new obstacle's position to the exclusion list 
            # so we don't spawn another obstacle there.
            exclude_positions.append(pos)
    
    def respawn_obstacles(self, snake_positions: List[Tuple[int, int]], food_position: Tuple[int, int]) -> None:
        """
        Respawn obstacles entirely:
        - Clears the current obstacle list and calls generate_obstacles() again.
        - This can be used if we want to dynamically change obstacle positions
          ensuring no overlap with snake or food.
        
        :param snake_positions: Current list of snake body positions.
        :param food_position: Current food position.
        """
        # Clear existing obstacles
        self.obstacle_list = []
        # Re-generate them (as a simple approach, we don't handle excluding 
        # snake_positions/food_position here unless needed).
        self.generate_obstacles()
