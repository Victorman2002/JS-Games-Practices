from PIL import Image

def cut_image(input_path, output_folder, rows, columns):
    # Open the image
    original_image = Image.open(input_path)

    # Get the size of the original image
    width, height = original_image.size

    # Calculate the width and height of each part
    part_width = width // columns
    part_height = height // rows

    # Loop through each row and column to cut the image
    for row in range(rows):
        for col in range(columns):
            left = col * part_width
            top = row * part_height
            right = (col + 1) * part_width
            bottom = (row + 1) * part_height

            # Crop the image
            part = original_image.crop((left, top, right, bottom))

            # Save the part to the output folder
            part.save(f"{output_folder}/part_{row}_{col}.png")

if __name__ == "__main__":
    input_image_path = "Puzzle/src/imgs/gtav.jpg"
    output_folder_path = "Puzzle/src/imgs/imgs-cuted"
    num_rows = 5
    num_columns = 5

    cut_image(input_image_path, output_folder_path, num_rows, num_columns)
