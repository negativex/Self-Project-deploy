import pygame
from settings import SCREEN_WIDTH, SCREEN_HEIGHT, FPS, GameState, Direction, BLOCK_SIZE, Colors
from entities import Snake, Food, Obstacles
from score import ScoreManager
from ui import UI
from utils import check_collision

class GameEngine:
    """
    The main game engine class that manages the game loop, state transitions,
    rendering, and event handling for the Snake game.
    """
    def __init__(self):
        """
        Initialize the game engine:
        - Initialize Pygame
        - Set up the display, clock, and caption
        - Call reset_game() to set all entities to their initial states
        """
        pygame.init()
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Snake Game")
        self.clock = pygame.time.Clock()
        self.reset_game()
    
    def reset_game(self) -> None:
        """
        Reset the game to its initial state by:
        - Creating a new Snake instance
        - Generating Obstacles
        - Spawning new Food, ensuring it doesn't overlap with Snake or Obstacles
        - Initializing the ScoreManager and UI
        - Setting the game state to MENU and 'running' to True
        """
        # Create a new snake
        self.snake = Snake()
        
        # Create obstacles (adjust the number of obstacles as needed)
        self.obstacles = Obstacles(number_of_obstacles=15)
        
        # Collect positions to exclude for food placement
        snake_positions = self.snake.positions
        obstacle_positions = [obs.position for obs in self.obstacles.obstacle_list]
        
        # Initialize food, making sure it doesn't spawn on the snake or obstacles
        self.food = Food(snake_positions, obstacle_positions)
        
        # Score manager and UI for drawing text, scores, etc.
        self.score_manager = ScoreManager()
        self.ui = UI()
        
        # Start the game in the MENU state
        self.state = GameState.MENU
        
        # Flag to indicate if the game loop should continue running
        self.running = True
    
    def handle_events(self) -> None:
        """
        Handle all incoming Pygame events such as:
        - QUIT event (close the game)
        - KEYDOWN events for state transitions and controlling the Snake
        """
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                # If the window is closed, stop running
                self.running = False
            
            elif event.type == pygame.KEYDOWN:
                # --- MENU State Controls ---
                if self.state == GameState.MENU:
                    if event.key == pygame.K_SPACE:
                        # Start playing
                        self.state = GameState.PLAYING
                    elif event.key == pygame.K_q:
                        # Quit directly from the menu
                        self.running = False
                
                # --- PLAYING State Controls ---
                elif self.state == GameState.PLAYING:
                    # Change direction, but prevent reversing directly into itself
                    if event.key == pygame.K_UP and self.snake.direction != Direction.DOWN:
                        self.snake.direction = Direction.UP
                    elif event.key == pygame.K_DOWN and self.snake.direction != Direction.UP:
                        self.snake.direction = Direction.DOWN
                    elif event.key == pygame.K_LEFT and self.snake.direction != Direction.RIGHT:
                        self.snake.direction = Direction.LEFT
                    elif event.key == pygame.K_RIGHT and self.snake.direction != Direction.LEFT:
                        self.snake.direction = Direction.RIGHT
                    elif event.key == pygame.K_ESCAPE:
                        # Pause the game
                        self.state = GameState.PAUSED
                
                # --- GAME_OVER State Controls ---
                elif self.state == GameState.GAME_OVER:
                    if event.key == pygame.K_SPACE:
                        # Reset and start a new game
                        self.reset_game()
                        self.state = GameState.PLAYING
    
    def update(self) -> None:
        """
        Update the game state every frame:
        - Move the snake
        - Check collision with food, snake body (self-collision), and obstacles
        - If collisions occur, change the state to GAME_OVER
        """
        # Only update if we're in PLAYING state
        if self.state != GameState.PLAYING:
            return
        
        # Move the snake in its current direction
        self.snake.move()
        
        # -- Check collision with Food --
        # If the head of the snake collides with the food
        if check_collision(self.snake.positions[0], self.food.position):
            # Grow the snake by 1 segment
            self.snake.grow()
            
            # Exclude positions currently occupied by snake and obstacles
            exclude = self.snake.positions + [obs.position for obs in self.obstacles.obstacle_list]
            self.food.respawn(exclude)
            
            # Increase the score
            self.score_manager.increment_score()
        
        # -- Check collision with self --
        if self.snake.check_self_collision():
            # If the snake's head is in its body, game over
            self.state = GameState.GAME_OVER
            return
        
        # -- Check collision with obstacles --
        # If the head collides with any obstacle
        if any(check_collision(self.snake.positions[0], obstacle.position) 
               for obstacle in self.obstacles.obstacle_list):
            self.state = GameState.GAME_OVER
    
    def draw(self) -> None:
        """
        Draw the current frame based on the game state:
        - MENU: draw the menu screen
        - PLAYING: draw snake, food, obstacles, and score
        - GAME_OVER: draw the game-over screen and the leaderboard
        """
        # Clear the screen with black color
        self.screen.fill(Colors.BLACK)
        
        # --- MENU State ---
        if self.state == GameState.MENU:
            self.ui.draw_menu(self.screen)
        
        # --- PLAYING State ---
        elif self.state == GameState.PLAYING:
            # Draw snake segments
            for position in self.snake.positions:
                pygame.draw.rect(self.screen, Colors.GREEN,
                                 (*position, BLOCK_SIZE, BLOCK_SIZE))
            
            # Draw food
            pygame.draw.rect(self.screen, Colors.RED,
                             (*self.food.position, BLOCK_SIZE, BLOCK_SIZE))
            
            # Draw obstacles
            for obstacle in self.obstacles.obstacle_list:
                pygame.draw.rect(self.screen, Colors.BLUE,
                                 (*obstacle.position, BLOCK_SIZE, BLOCK_SIZE))
            
            # Draw score text in the top-left corner
            self.ui.draw_score(self.screen, self.score_manager.current_score)
        
        # --- GAME_OVER State ---
        elif self.state == GameState.GAME_OVER:
            self.ui.draw_game_over(
                self.screen,
                self.score_manager.current_score,
                self.score_manager.leaderboard.get_high_scores()
            )
        
        # Flip the display to show the latest frame
        pygame.display.flip()
    
    def run(self) -> None:
        """
        Main game loop:
        - While the game is running, handle events, update, and draw
        - Maintain a fixed Frames Per Second (FPS) using the clock
        - Quit Pygame when the loop ends
        """
        while self.running:
            self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(FPS)
        
        pygame.quit()
