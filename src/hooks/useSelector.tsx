import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { AppState } from "@/src/interfaces/state";

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
