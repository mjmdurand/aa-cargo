import cv2
import numpy as np
import os
import re

# --- Paramètres ---
image_folder = "./ship"  # dossier contenant vos images
output_txt = "coordonnees_points.txt"

# Plage HSV pour le bleu
lower_blue = np.array([75, 80, 150])
upper_blue = np.array([105, 255, 255])

# Fonction pour extraire le numéro de l'image
def image_number(filename):
    match = re.search(r'(\d+)', filename)
    return int(match.group(1)) if match else -1

# Liste des fichiers image
image_files = [f for f in os.listdir(image_folder) if f.lower().endswith((".png", ".jpg", ".jpeg"))]
# Tri numérique
image_files.sort(key=image_number)

# Liste pour stocker les coordonnées
results = []

# --- Traitement des images ---
for filename in image_files:
    img_path = os.path.join(image_folder, filename)
    img = cv2.imread(img_path)
    if img is None:
        continue
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3,3), np.uint8))
    mask = cv2.dilate(mask, np.ones((3,3), np.uint8), iterations=1)
    
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        c = max(contours, key=cv2.contourArea)
        M = cv2.moments(c)
        if M["m00"] != 0:
            cx = int(M["m10"] / M["m00"])
            cy = int(M["m01"] / M["m00"])
            results.append(f"x:{cx},y:{cy}")

# --- Sauvegarde en monoline ---
with open(output_txt, "w") as f:
    f.write("[ " + ",".join("{" + coord + "}" for coord in results) + " ]")

print(f"Coordonnées sauvegardées sous {output_txt}")
