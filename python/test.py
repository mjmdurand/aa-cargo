import cv2
import numpy as np

# --- Paramètres ---
image_path = "./ship/1.jpg"  # Remplacez par une image de test
output_mask = "mask_test.png"

# Plage HSV pour le bleu (à ajuster si nécessaire)
lower_blue = np.array([80, 100, 150])
upper_blue = np.array([100, 255, 255])

# --- Chargement image ---
img = cv2.imread(image_path)
if img is None:
    print("Impossible de lire l'image.")
    exit()

# Conversion en HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Création du masque
mask = cv2.inRange(hsv, lower_blue, upper_blue)

# Nettoyage du masque (optionnel)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3,3), np.uint8))

# Sauvegarde du masque pour vérification
cv2.imwrite(output_mask, mask)
print(f"Masque sauvegardé sous {output_mask}")
