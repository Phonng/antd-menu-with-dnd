import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const arrayMove = (array, oldIndex, newIndex) => {
	return dndKitArrayMove(array, oldIndex, newIndex);
};
