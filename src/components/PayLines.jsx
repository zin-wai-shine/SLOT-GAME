const Paylines = [
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], // Top Row
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], // Middle Row
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]], // Bottom Row

    // Diagonal
    [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]], // Diagonal (Top-Left to Bottom-Right)
    [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], // Diagonal (Top-Right to Bottom-Left)

    // Vertical
    [[0, 0], [0, 1], [0, 2]], // Vertical Left
    [[1, 0], [1, 1], [1, 2]], // Vertical Middle
    [[2, 0], [2, 1], [2, 2]], // Vertical Right
    [[3, 0], [3, 1], [3, 2]], // Extra Vertical Left (new for 5 columns)
    [[4, 0], [4, 1], [4, 2]], // Extra Vertical Right (new for 5 columns)

    // Zig-Zag Patterns
    [[0, 0], [1, 1], [2, 0], [1, 1], [0, 0]], // Zig-Zag
    [[0, 2], [1, 1], [2, 2], [1, 1], [0, 2]], // Reverse Zig-Zag

    // More custom patterns, ensuring they fit within 3 rows
    [[0, 0], [0, 1], [0, 2], [1, 1], [1, 1]], // Custom Pattern 1
    [[1, 0], [1, 1], [1, 2], [2, 1], [2, 1]], // Custom Pattern 2
    [[2, 0], [2, 1], [2, 2], [1, 1], [1, 1]], // Custom Pattern 3
    [[0, 1], [1, 0], [1, 2], [2, 0], [2, 1]], // Custom Pattern 4
    [[0, 1], [1, 0], [1, 1], [2, 1], [2, 2]], // Custom Pattern 5
];


export default Paylines

