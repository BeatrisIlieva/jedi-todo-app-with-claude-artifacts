import React, { useState, useEffect, useCallback } from 'react';

// Type definitions for SWAPI data structures
interface SWAPIPerson {
    id: number;
    name: string;
    homeworld: string;
}

interface SWAPIPlanet {
    id: number;
    name: string;
    climate: string;
    terrain: string;
}

interface SWAPIStarship {
    id: number;
    name: string;
    model: string;
}

interface SWAPISpecies {
    id: number;
    name: string;
    classification: string;
}

interface MockSWAPIData {
    people: SWAPIPerson[];
    planets: SWAPIPlanet[];
    starships: SWAPIStarship[];
    species: SWAPISpecies[];
}

// Task-related type definitions
type TaskType =
    | 'Mission'
    | 'Training'
    | 'Diplomacy'
    | 'Exploration'
    | 'Maintenance'
    | 'Study'
    | 'Custom';

interface Task {
    id: number;
    text: string;
    type: TaskType;
    icon: string;
    completed: boolean;
    createdAt: string;
}

interface TaskTemplate {
    template: string;
    type: TaskType;
    icon: string;
}

// Theme type definitions
interface Theme {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    lightsaber: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
}

// Jedi rank system
type JediRank =
    | 'YOUNGLING'
    | 'PADAWAN'
    | 'JEDI KNIGHT'
    | 'JEDI MASTER';

interface RankInfo {
    title: string;
    emoji: string;
    threshold: number;
}

// Mock SWAPI data with proper typing
const mockSWAPIData: MockSWAPIData = {
    people: [
        { id: 1, name: 'Luke Skywalker', homeworld: 'Tatooine' },
        { id: 2, name: 'Leia Organa', homeworld: 'Alderaan' },
        { id: 3, name: 'Han Solo', homeworld: 'Corellia' },
        { id: 4, name: 'Obi-Wan Kenobi', homeworld: 'Stewjon' },
        { id: 5, name: 'Yoda', homeworld: 'Dagobah' },
        { id: 6, name: 'Darth Vader', homeworld: 'Tatooine' },
        { id: 7, name: 'Chewbacca', homeworld: 'Kashyyyk' },
        { id: 8, name: 'Palpatine', homeworld: 'Naboo' }
    ],
    planets: [
        {
            id: 1,
            name: 'Tatooine',
            climate: 'arid',
            terrain: 'desert'
        },
        {
            id: 2,
            name: 'Alderaan',
            climate: 'temperate',
            terrain: 'grasslands, mountains'
        },
        {
            id: 3,
            name: 'Yavin IV',
            climate: 'temperate, tropical',
            terrain: 'jungle, rainforests'
        },
        {
            id: 4,
            name: 'Hoth',
            climate: 'frozen',
            terrain: 'tundra, ice caves'
        },
        {
            id: 5,
            name: 'Dagobah',
            climate: 'murky',
            terrain: 'swamp, jungles'
        },
        {
            id: 6,
            name: 'Bespin',
            climate: 'temperate',
            terrain: 'gas giant'
        },
        {
            id: 7,
            name: 'Endor',
            climate: 'temperate',
            terrain: 'forests, mountains'
        },
        {
            id: 8,
            name: 'Naboo',
            climate: 'temperate',
            terrain: 'grassy hills, swamps'
        }
    ],
    starships: [
        {
            id: 1,
            name: 'Millennium Falcon',
            model: 'YT-1300 light freighter'
        },
        {
            id: 2,
            name: 'X-wing',
            model: 'T-65 X-wing starfighter'
        },
        {
            id: 3,
            name: 'TIE Fighter',
            model: 'Twin Ion Engine starfighter'
        },
        {
            id: 4,
            name: 'Star Destroyer',
            model: 'Imperial I-class Star Destroyer'
        },
        {
            id: 5,
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station'
        },
        {
            id: 6,
            name: 'Slave I',
            model: 'Firespray-31-class patrol craft'
        }
    ],
    species: [
        { id: 1, name: 'Human', classification: 'mammal' },
        { id: 2, name: 'Wookiee', classification: 'mammal' },
        { id: 3, name: 'Ewok', classification: 'mammal' },
        { id: 4, name: 'Hutt', classification: 'gastropod' },
        { id: 5, name: "Twi'lek", classification: 'mammal' },
        { id: 6, name: 'Rodian', classification: 'reptile' }
    ]
};

// Task templates with proper typing
const taskTemplates: TaskTemplate[] = [
    {
        template: 'Investigate disturbances on {PLANET}',
        type: 'Mission',
        icon: '🔍'
    },
    {
        template: 'Escort {CHARACTER} safely to {PLANET}',
        type: 'Mission',
        icon: '🛡️'
    },
    {
        template: 'Study the ways of the {SPECIES}',
        type: 'Training',
        icon: '📚'
    },
    {
        template: 'Master {STARSHIP} flight controls',
        type: 'Training',
        icon: '🚀'
    },
    {
        template: 'Meditate on the {PLANET} terrain',
        type: 'Training',
        icon: '🧘'
    },
    {
        template: 'Negotiate peace treaty with {SPECIES}',
        type: 'Diplomacy',
        icon: '🤝'
    },
    {
        template: 'Retrieve ancient artifacts from {PLANET}',
        type: 'Exploration',
        icon: '🏺'
    },
    {
        template: 'Train {CHARACTER} in lightsaber combat',
        type: 'Training',
        icon: '⚔️'
    },
    {
        template: 'Repair damaged {STARSHIP}',
        type: 'Maintenance',
        icon: '🔧'
    },
    {
        template: 'Establish outpost on {PLANET}',
        type: 'Mission',
        icon: '🏗️'
    },
    {
        template: 'Learn {SPECIES} communication methods',
        type: 'Study',
        icon: '💬'
    },
    {
        template: 'Protect {CHARACTER} from Imperial forces',
        type: 'Mission',
        icon: '🛡️'
    },
    {
        template:
            'Survey {PLANET} for Force-sensitive individuals',
        type: 'Exploration',
        icon: '🌟'
    },
    {
        template: 'Sabotage Imperial {STARSHIP}',
        type: 'Mission',
        icon: '💥'
    },
    {
        template: 'Document {SPECIES} cultural traditions',
        type: 'Study',
        icon: '📜'
    }
];

// Color themes with proper typing
const themes: Theme[] = [
    {
        name: 'Jedi Blue',
        primary: '#4fc3f7',
        secondary: '#29b6f6',
        accent: '#81d4fa',
        lightsaber:
            'linear-gradient(90deg, #4fc3f7, #29b6f6, #81d4fa)'
    },
    {
        name: 'Sith Red',
        primary: '#f44336',
        secondary: '#d32f2f',
        accent: '#ff5722',
        lightsaber:
            'linear-gradient(90deg, #f44336, #d32f2f, #ff5722)'
    },
    {
        name: 'Mace Windu Purple',
        primary: '#9c27b0',
        secondary: '#7b1fa2',
        accent: '#ba68c8',
        lightsaber:
            'linear-gradient(90deg, #9c27b0, #7b1fa2, #ba68c8)'
    },
    {
        name: 'Yoda Green',
        primary: '#66bb6a',
        secondary: '#43a047',
        accent: '#81c784',
        lightsaber:
            'linear-gradient(90deg, #66bb6a, #43a047, #81c784)'
    }
];

// Jedi rank definitions
const jediRanks: Record<JediRank, RankInfo> = {
    YOUNGLING: { title: 'Youngling', emoji: '🔰', threshold: 0 },
    PADAWAN: { title: 'Padawan', emoji: '🌟', threshold: 50 },
    'JEDI KNIGHT': {
        title: 'Jedi Knight',
        emoji: '⭐',
        threshold: 75
    },
    'JEDI MASTER': {
        title: 'Jedi Master',
        emoji: '🏆',
        threshold: 100
    }
};

const JediTodoApp: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [customTask, setCustomTask] = useState<string>('');
    const [completedCount, setCompletedCount] =
        useState<number>(0);
    const [currentTheme, setCurrentTheme] =
        useState<Theme | null>(null);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Utility function to get random array element with type safety
    const getRandomElement = <T,>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)];
    };

    // Generate random particles for background
    const generateParticles = useCallback((): void => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.1
            });
        }
        setParticles(newParticles);
    }, []);

    // Initialize app with random theme and particles
    useEffect(() => {
        const randomTheme: Theme = getRandomElement(themes);
        setCurrentTheme(randomTheme);
        generateParticles();
        generateInitialTasks();
    }, [generateParticles]);

    // Animate particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((particle: Particle) => ({
                    ...particle,
                    x: (particle.x + particle.speed) % 100
                }))
            );
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Generate random task using mock data with type safety
    const generateRandomTask = useCallback((): Task => {
        const template: TaskTemplate =
            getRandomElement(taskTemplates);
        let taskText: string = template.template;

        // Replace placeholders with random data
        if (taskText.includes('{PLANET}')) {
            const planet: SWAPIPlanet = getRandomElement(
                mockSWAPIData.planets
            );
            taskText = taskText.replace('{PLANET}', planet.name);
        }
        if (taskText.includes('{CHARACTER}')) {
            const character: SWAPIPerson = getRandomElement(
                mockSWAPIData.people
            );
            taskText = taskText.replace(
                '{CHARACTER}',
                character.name
            );
        }
        if (taskText.includes('{SPECIES}')) {
            const species: SWAPISpecies = getRandomElement(
                mockSWAPIData.species
            );
            taskText = taskText.replace(
                '{SPECIES}',
                species.name
            );
        }
        if (taskText.includes('{STARSHIP}')) {
            const starship: SWAPIStarship = getRandomElement(
                mockSWAPIData.starships
            );
            taskText = taskText.replace(
                '{STARSHIP}',
                starship.name
            );
        }

        return {
            id: Date.now() + Math.random(),
            text: taskText,
            type: template.type,
            icon: template.icon,
            completed: false,
            createdAt: new Date().toISOString()
        };
    }, []);

    // Generate initial batch of tasks
    const generateInitialTasks = useCallback((): void => {
        const initialTasks: Task[] = [];
        for (let i = 0; i < 10; i++) {
            initialTasks.push(generateRandomTask());
        }
        setTasks(initialTasks);
        setCompletedCount(0);
    }, [generateRandomTask]);

    // Add custom task with type safety
    const addCustomTask = useCallback((): void => {
        if (customTask.trim()) {
            const newTask: Task = {
                id: Date.now(),
                text: customTask.trim(),
                type: 'Custom',
                icon: '✨',
                completed: false,
                createdAt: new Date().toISOString()
            };
            setTasks((prev) => [newTask, ...prev]);
            setCustomTask('');
        }
    }, [customTask]);

    // Toggle task completion with proper state management
    const toggleTask = useCallback((taskId: number): void => {
        setTasks((prev) =>
            prev.map((task: Task) => {
                if (task.id === taskId) {
                    const newCompleted: boolean = !task.completed;
                    if (newCompleted) {
                        setCompletedCount((c) => c + 1);
                    } else {
                        setCompletedCount((c) => c - 1);
                    }
                    return { ...task, completed: newCompleted };
                }
                return task;
            })
        );
    }, []);

    // Handle custom task input
    const handleCustomTaskChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            setCustomTask(e.target.value);
        },
        []
    );

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (e.key === 'Enter') {
                addCustomTask();
            }
        },
        [addCustomTask]
    );

    // Calculate progress with type safety
    const progress: number =
        tasks.length > 0
            ? (tasks.filter((t) => t.completed).length /
                  tasks.length) *
              100
            : 0;

    // Get current Jedi rank based on progress
    const getCurrentRank = useCallback((): RankInfo => {
        if (progress >= jediRanks['JEDI MASTER'].threshold)
            return jediRanks['JEDI MASTER'];
        if (progress >= jediRanks['JEDI KNIGHT'].threshold)
            return jediRanks['JEDI KNIGHT'];
        if (progress >= jediRanks['PADAWAN'].threshold)
            return jediRanks['PADAWAN'];
        return jediRanks['YOUNGLING'];
    }, [progress]);

    // Get progress color based on completion percentage
    const getProgressColor = useCallback((): string => {
        if (!currentTheme) return '#4fc3f7';
        if (progress < 33) return currentTheme.primary;
        if (progress < 66) return '#66bb6a';
        return '#9c27b0';
    }, [progress, currentTheme]);

    // Mouse event handlers with proper typing
    const handleMouseOver = useCallback(
        (
            e: React.MouseEvent<HTMLDivElement>,
            task: Task
        ): void => {
            if (!task.completed) {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = 'translateY(-5px)';
                target.style.boxShadow = `0 10px 25px ${currentTheme?.primary}30`;
            }
        },
        [currentTheme]
    );

    const handleMouseOut = useCallback(
        (
            e: React.MouseEvent<HTMLDivElement>,
            task: Task
        ): void => {
            const target = e.currentTarget as HTMLDivElement;
            target.style.transform = task.completed
                ? 'scale(0.98)'
                : 'scale(1)';
            target.style.boxShadow = 'none';
        },
        []
    );

    const handleButtonHover = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>): void => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = 'translateY(-2px)';
        },
        []
    );

    const handleButtonLeave = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>): void => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = 'translateY(0px)';
        },
        []
    );

    // Loading state
    if (!currentTheme) return null;

    const currentRank: RankInfo = getCurrentRank();

    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated particle background */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                {particles.map((particle: Particle) => (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: currentTheme.primary,
                            borderRadius: '50%',
                            opacity: 0.6,
                            boxShadow: `0 0 ${
                                particle.size * 2
                            }px ${currentTheme.primary}`
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '20px'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}
                >
                    <h1
                        style={{
                            fontSize: '3rem',
                            marginBottom: '10px',
                            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `0 0 20px ${currentTheme.primary}50`,
                            animation:
                                'glow 2s ease-in-out infinite alternate'
                        }}
                    >
                        ⚔️ JEDI TASK TERMINAL ⚔️
                    </h1>
                    <p
                        style={{
                            color: '#aaaaaa',
                            fontSize: '1.2rem',
                            marginBottom: '10px'
                        }}
                    >
                        Current Theme:{' '}
                        <strong
                            style={{
                                color: currentTheme.primary
                            }}
                        >
                            {currentTheme.name}
                        </strong>
                    </p>
                    <p
                        style={{
                            color: '#888888',
                            fontSize: '1rem'
                        }}
                    >
                        Complete your missions to become a true
                        Jedi Master
                    </p>
                </div>

                {/* Controls */}
                <div
                    style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        marginBottom: '30px',
                        flexWrap: 'wrap',
                        maxWidth: '800px',
                        margin: '0 auto 30px auto'
                    }}
                >
                    <button
                        onClick={generateInitialTasks}
                        style={{
                            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                            border: 'none',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: `0 4px 15px ${currentTheme.primary}50`,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={handleButtonHover}
                        onMouseOut={handleButtonLeave}
                    >
                        🎯 Generate New Missions
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type='text'
                            value={customTask}
                            onChange={handleCustomTaskChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Add custom Jedi task...'
                            style={{
                                background:
                                    'rgba(255, 255, 255, 0.1)',
                                border: `2px solid ${currentTheme.primary}50`,
                                borderRadius: '20px',
                                padding: '10px 20px',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                width: '250px'
                            }}
                        />
                        <button
                            onClick={addCustomTask}
                            style={{
                                background: `linear-gradient(45deg, ${currentTheme.accent}, ${currentTheme.primary})`,
                                border: 'none',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            ➕ Add
                        </button>
                    </div>
                </div>

                {/* Tasks Grid */}
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'grid',
                        gap: '20px',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(350px, 1fr))',
                        marginBottom: '100px'
                    }}
                >
                    {tasks.map((task: Task) => (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            style={{
                                background: task.completed
                                    ? `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: `2px solid ${
                                    task.completed
                                        ? currentTheme.primary
                                        : 'rgba(255, 255, 255, 0.1)'
                                }`,
                                borderRadius: '15px',
                                padding: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'hidden',
                                opacity: task.completed ? 0.8 : 1,
                                transform: task.completed
                                    ? 'scale(0.98)'
                                    : 'scale(1)'
                            }}
                            onMouseOver={(e) =>
                                handleMouseOver(e, task)
                            }
                            onMouseOut={(e) =>
                                handleMouseOut(e, task)
                            }
                        >
                            {task.completed && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(45deg, ${currentTheme.primary}10, transparent)`,
                                        animation:
                                            'completionPulse 1s ease-out'
                                    }}
                                />
                            )}

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    marginBottom: '10px'
                                }}
                            >
                                <span
                                    style={{ fontSize: '1.8rem' }}
                                >
                                    {task.icon}
                                </span>
                                <div>
                                    <div
                                        style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            textDecoration:
                                                task.completed
                                                    ? 'line-through'
                                                    : 'none',
                                            color: task.completed
                                                ? '#aaaaaa'
                                                : '#ffffff'
                                        }}
                                    >
                                        {task.text}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.9rem',
                                            color: currentTheme.primary,
                                            fontWeight: '600'
                                        }}
                                    >
                                        {task.type}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    fontSize: '0.8rem',
                                    color: '#888888',
                                    display: 'flex',
                                    justifyContent:
                                        'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span>
                                    Created:{' '}
                                    {new Date(
                                        task.createdAt
                                    ).toLocaleDateString()}
                                </span>
                                <span
                                    style={{
                                        color: task.completed
                                            ? currentTheme.primary
                                            : '#666666',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {task.completed
                                        ? '✅ COMPLETED'
                                        : '⏳ PENDING'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightsaber Progress Bar Footer */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px',
                    borderTop: `2px solid ${currentTheme.primary}30`,
                    zIndex: 2
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    color: currentTheme.primary,
                                    fontSize: '1.2rem'
                                }}
                            >
                                🌟 Jedi Progress:{' '}
                                {progress.toFixed(1)}%
                            </h3>
                            <p
                                style={{
                                    margin: '5px 0 0 0',
                                    color: '#aaaaaa',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {
                                    tasks.filter(
                                        (t) => t.completed
                                    ).length
                                }{' '}
                                of {tasks.length} missions
                                completed
                            </p>
                        </div>
                        <div
                            style={{
                                color: currentTheme.primary,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {currentRank.emoji}{' '}
                            {currentRank.title.toUpperCase()}
                        </div>
                    </div>

                    {/* Lightsaber Progress Bar */}
                    <div
                        style={{
                            width: '100%',
                            height: '12px',
                            background:
                                'rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                height: '100%',
                                background:
                                    currentTheme.lightsaber,
                                borderRadius: '6px',
                                transition: 'all 0.5s ease',
                                boxShadow: `0 0 20px ${getProgressColor()}`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background:
                                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    animation:
                                        progress > 0
                                            ? 'lightsaberGlow 2s ease-in-out infinite'
                                            : 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes glow {
          from { text-shadow: 0 0 20px ${currentTheme.primary}50; }
          to { text-shadow: 0 0 30px ${currentTheme.primary}80, 0 0 40px ${currentTheme.primary}60; }
        }
        @keyframes lightsaberGlow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes completionPulse {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default JediTodoApp;
