Below is a **markdown**-formatted **pseudocode** capturing the core logic and flow of your Snake Game program. Use this as a high-level reference for how the system operates, from initialization to rendering and event handling.

---

# Snake Game Pseudocode

## 1. `main.py`
```plaintext
FUNCTION main():
    CREATE an instance of GameEngine
    CALL game.run()  # Enters the main game loop
```

---

## 2. `engine.py`
```plaintext
CLASS GameEngine:
    
    CONSTRUCTOR __init__():
        INIT pygame
        SET display mode to (SCREEN_WIDTH, SCREEN_HEIGHT)
        CREATE a clock for FPS management
        CALL reset_game()
    
    FUNCTION reset_game():
        CREATE a new Snake object
        CREATE an Obstacles object with a fixed number_of_obstacles
        STORE snake positions and obstacle positions
        CREATE a Food object ensuring it doesn't overlap snake or obstacles
        CREATE a ScoreManager object for score tracking
        CREATE a UI object for drawing
        SET game state to MENU
        SET running flag to True
    
    FUNCTION handle_events():
        FOR each event in pygame's event queue:
            IF event is QUIT:
                SET running to False  # Exit game
                
            IF event is KEYDOWN:
                # --- MENU State ---
                IF state == MENU:
                    IF SPACE pressed: state = PLAYING
                    IF Q pressed: running = False
                
                # --- PLAYING State ---
                IF state == PLAYING:
                    IF arrow key pressed (UP, DOWN, LEFT, RIGHT):
                        CHANGE snake direction (if not reversing)
                    IF ESC pressed: state = PAUSED
                
                # --- GAME_OVER State ---
                IF state == GAME_OVER:
                    IF SPACE pressed:
                        CALL reset_game()
                        SET state to PLAYING
    
    FUNCTION update():
        IF state != PLAYING:
            RETURN  # Only update logic if actively playing
        
        CALL snake.move()
        
        # Check collisions
        IF snake head collides with Food:
            CALL snake.grow()
            CALL food.respawn(excluding snake + obstacles)
            CALL score_manager.increment_score()
        
        IF snake.check_self_collision():
            state = GAME_OVER
        
        IF snake head collides with any obstacle:
            state = GAME_OVER
    
    FUNCTION draw():
        CLEAR screen with black
        
        IF state == MENU:
            CALL ui.draw_menu(screen)
        
        ELSE IF state == PLAYING:
            DRAW snake segments
            DRAW food
            DRAW obstacles
            CALL ui.draw_score(screen, current_score)
        
        ELSE IF state == GAME_OVER:
            CALL ui.draw_game_over(
                screen,
                score_manager.current_score,
                score_manager.leaderboard.get_high_scores()
            )
        
        UPDATE display (pygame.display.flip())
    
    FUNCTION run():
        WHILE running:
            CALL handle_events()
            CALL update()
            CALL draw()
            CLOCK tick(FPS)
        
        QUIT pygame
```

---

## 3. `entities.py`
```plaintext
CLASS Snake:
    
    CONSTRUCTOR __init__():
        CALL reset()
    
    FUNCTION reset():
        SET snake start position to screen center
        SET initial direction to RIGHT
        SET grow_pending to INITIAL_SNAKE_LENGTH - 1
    
    FUNCTION move():
        CALCULATE new head position based on direction (wrapping around screen edges)
        INSERT new head at front of snake.positions
        IF grow_pending > 0:
            DECREMENT grow_pending
        ELSE:
            REMOVE last segment (pop) from positions
    
    FUNCTION grow():
        INCREMENT grow_pending
    
    FUNCTION check_self_collision():
        RETURN True IF snake head is in snake.positions[1:]

CLASS Food:
    
    CONSTRUCTOR __init__(snake_positions, obstacle_positions):
        GENERATE random valid position excluding snake + obstacles
    
    FUNCTION respawn(exclude_positions):
        GENERATE a new random valid position excluding the given positions

CLASS Obstacle:
    
    CONSTRUCTOR __init__(position):
        SET self.position = position

CLASS Obstacles:
    
    CONSTRUCTOR __init__(number_of_obstacles):
        SET self.number_of_obstacles
        CREATE an empty obstacle_list
        CALL generate_obstacles()
    
    FUNCTION generate_obstacles():
        EXCLUDE the center position (snake start)
        WHILE length of obstacle_list < number_of_obstacles:
            GET random position excluding existing obstacles
            CREATE new Obstacle and add to obstacle_list
    
    FUNCTION respawn_obstacles(snake_positions, food_position):
        CLEAR obstacle_list
        CALL generate_obstacles()  # (Basic approach that doesn't strictly exclude snake/food if not coded so)
```

---

## 4. `score.py`
```plaintext
CLASS ScoreManager:
    
    CONSTRUCTOR __init__():
        SET current_score to 0
        CREATE a Leaderboard instance
    
    FUNCTION increment_score(amount=1):
        ADD amount to current_score
        CALL leaderboard.update_high_scores(current_score)
    
    FUNCTION reset_score():
        SET current_score to 0

CLASS Leaderboard:
    
    CONSTRUCTOR __init__(max_entries=10):
        LOAD existing high_scores from JSON file
        STORE in self.high_scores
    
    FUNCTION update_high_scores(score):
        IF length of high_scores < max_entries OR score > last entry in high_scores:
            GET player name (stubbed or from input)
            CREATE new entry {name, score}
            ADD to high_scores
            SORT high_scores in descending order, limit to max_entries
            SAVE updated list to JSON (save_high_scores)
    
    FUNCTION get_player_name():
        RETURN "Player"  # placeholder or real input
    
    FUNCTION get_high_scores():
        RETURN self.high_scores
```

---

## 5. `settings.py`
```plaintext
# Constants and Enums:

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
BLOCK_SIZE = 20
FPS = 10
INITIAL_SNAKE_LENGTH = 3

CLASS Colors:
    BLACK = (0,0,0)
    WHITE = (255,255,255)
    RED = (255,0,0)
    GREEN = (0,255,0)
    BLUE = (0,0,255)
    ...

ENUM Direction:
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

ENUM GameState:
    MENU = 1
    PLAYING = 2
    PAUSED = 3
    GAME_OVER = 4
```

---

## 6. `ui.py`
```plaintext
CLASS UI:
    
    CONSTRUCTOR __init__():
        INIT pygame font
        CREATE default font and large font
    
    FUNCTION draw_text(surface, text, pos, color=WHITE, center=True, font=None):
        RENDER text_surface
        DETERMINE text_rect based on center or topleft
        BLIT text_surface onto surface
    
    FUNCTION draw_menu(surface):
        FILL background with BLACK
        DISPLAY "SNAKE GAME" title
        DISPLAY "Press SPACE to Start"
        DISPLAY "Press Q to Quit"
    
    FUNCTION draw_game_over(surface, score, leaderboard):
        FILL background with BLACK
        DISPLAY "GAME OVER" title
        DISPLAY final score
        DISPLAY "High Scores:" + top entries from leaderboard
        DISPLAY "Press SPACE to Restart"
    
    FUNCTION draw_score(surface, score):
        DRAW "Score: <value>" near top-left corner
```

---

## 7. `utils.py`
```plaintext
FUNCTION get_random_position(exclude_positions=[]):
    DETERMINE max_x and max_y based on SCREEN_WIDTH, SCREEN_HEIGHT, BLOCK_SIZE
    LOOP indefinitely:
        GENERATE random x, y in grid increments of BLOCK_SIZE
        IF (x, y) not in exclude_positions:
            RETURN (x, y)

FUNCTION check_collision(pos1, pos2):
    RETURN True if pos1 == pos2, otherwise False

FUNCTION save_high_scores(high_scores):
    WRITE out JSON with structure {"high_scores": [...]} to 'high_scores.json'

FUNCTION load_high_scores():
    TRY to READ 'high_scores.json'
    PARSE JSON data
    RETURN data['high_scores'] if present, else []
    EXCEPT:
        RETURN []
```

---

# High-Level Flow Summary

1. **Program Start**  
   - When `main.py` is executed, it calls the `main()` function.  
   - A `GameEngine` instance is created, then `run()` is invoked.

2. **Game Initialization**  
   - The `GameEngine` constructor initializes Pygame and sets up the window, then calls `reset_game()`.  
   - `reset_game()` creates all game objects (Snake, Food, Obstacles, ScoreManager, UI) and sets the initial state to `MENU`.

3. **Main Game Loop** (`engine.py -> run()`)  
   - **handle_events()**: Processes user input and adjusts game state or snake direction accordingly.  
   - **update()**: Moves the snake, checks collisions with food/obstacles/self, updates the score if needed, or transitions to `GAME_OVER`.  
   - **draw()**: Clears the screen, draws everything based on the current game state (menu, playing, game over).

4. **Game Over & Restart**  
   - When `GAME_OVER` state is reached, the `draw_game_over()` function displays final score and leaderboard.  
   - Pressing SPACE in this state resets the game (`reset_game()`) and transitions back to `PLAYING`.

5. **Score & Leaderboard**  
   - Each time the snake eats food, `ScoreManager` increments the score and checks if it qualifies for a leaderboard entry.  
   - `Leaderboard` handles storing/updating top scores in `high_scores.json`.

6. **Exit**  
   - If the player quits, `running` becomes `False`, the main loop ends, and the Pygame window closes.

---

**Note**: This pseudocode focuses on illustrating the **high-level** logic. Individual method implementations in your actual code may have additional details or checks.