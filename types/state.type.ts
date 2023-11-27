import { WithSession } from "fresh-session/src/stores/interface.ts";

/**
 * State of the application
 */
export default interface State extends WithSession {
  /** Unhashed */
  token?: string;
  isAdmin: boolean;
  label: string | null;
}
