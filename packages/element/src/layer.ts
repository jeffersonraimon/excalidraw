import { DEFAULT_LAYER_ID } from "@excalidraw/common";

import type { ExcalidrawElement, Layer } from "./types";

const getLayerForElement = (
  element: ExcalidrawElement,
  layers: readonly Layer[],
): Layer | undefined => {
  const elementLayerId = element.layerId ?? DEFAULT_LAYER_ID;
  return layers.find((l) => l.id === elementLayerId);
};

/**
 * Check if an element is on a visible layer.
 * Elements with null layerId are considered to be on the default layer.
 * If no layers are defined, all elements are visible.
 */
export const isElementInVisibleLayer = (
  element: ExcalidrawElement,
  layers: readonly Layer[],
): boolean => {
  // If no layers exist, everything is visible
  if (layers.length === 0) {
    return true;
  }

  const layer = getLayerForElement(element, layers);

  // If layer not found (element on non-existent layer), default to visible
  // This handles backward compatibility for elements without layers
  if (!layer) {
    return true;
  }

  return layer.visible;
};

/**
 * Check if an element is effectively locked.
 * An element is locked if its own locked flag is true or if its layer is locked.
 */
export const isElementLocked = (
  element: ExcalidrawElement,
  layers?: readonly Layer[],
): boolean => {
  if (element.locked) {
    return true;
  }

  if (!layers || layers.length === 0) {
    return false;
  }

  const layer = getLayerForElement(element, layers);
  return layer?.locked ?? false;
};

/**
 * Get the layer for an element.
 * Returns undefined if the layer doesn't exist.
 */
export const getElementLayer = (
  element: ExcalidrawElement,
  layers: readonly Layer[],
): Layer | undefined => {
  return getLayerForElement(element, layers);
};
