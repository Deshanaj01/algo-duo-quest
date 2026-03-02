import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { auth } from '../firebase.ts';
import {
  CombatMatch,
  CombatMatchEndPayload,
  CombatMatchFoundPayload,
  CombatOpponentProgressPayload,
  CombatProblem,
  CombatQueueJoinPayload,
  CombatSubmissionResultPayload,
  CombatTimerSyncPayload,
} from '../types/combat';

const API_BASE_URL =
  (process.env.REACT_APP_BACKEND_URL as string | undefined) ||
  'http://localhost:5001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/combat`,
});

async function authHeaders() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchCombatMatch(matchId: string): Promise<CombatMatch> {
  const headers = await authHeaders();
  const res = await api.get(`/match/${matchId}`, { headers });
  return res.data.data as CombatMatch;
}

export async function fetchCombatHistory(
  userId: string,
  limit = 20,
): Promise<CombatMatch[]> {
  const headers = await authHeaders();
  const res = await api.get(`/history/${userId}?limit=${limit}`, { headers });
  return res.data.data as CombatMatch[];
}

export async function fetchCombatProblems(): Promise<CombatProblem[]> {
  const headers = await authHeaders();
  const res = await api.get('/problems', { headers });
  return res.data.data as CombatProblem[];
}

export interface SubmitCombatCodeParams {
  matchId: string;
  code: string;
  language: string;
}

export interface SubmitCombatCodeResponse
  extends CombatSubmissionResultPayload {
  results: {
    input: string;
    passed: boolean;
    timeMs: number;
  }[];
  matchEnded: boolean;
  matchResult: CombatMatchEndPayload | null;
}

export async function submitCombatCode(
  params: SubmitCombatCodeParams,
): Promise<SubmitCombatCodeResponse> {
  const headers = await authHeaders();
  const res = await api.post(
    '/submit',
    {
      matchId: params.matchId,
      code: params.code,
      language: params.language,
    },
    { headers },
  );
  return res.data.data as SubmitCombatCodeResponse;
}

// -------- Socket.IO client --------

let combatSocket: Socket | null = null;

export function getCombatSocket(): Socket {
  if (combatSocket && combatSocket.connected) {
    return combatSocket;
  }

  combatSocket = io(API_BASE_URL, {
    transports: ['websocket'],
  });

  return combatSocket;
}

export function disconnectCombatSocket() {
  if (combatSocket) {
    combatSocket.disconnect();
    combatSocket = null;
  }
}

export function joinCombatQueue(payload: CombatQueueJoinPayload) {
  const socket = getCombatSocket();
  socket.emit('combat:join-queue', payload);
}

export function leaveCombatQueue(userId: string) {
  const socket = getCombatSocket();
  socket.emit('combat:leave-queue', { userId });
}

export function submitCombatCodeSocket(params: {
  matchId: string;
  userId: string;
  code: string;
  language: string;
}) {
  const socket = getCombatSocket();
  socket.emit('combat:submit-code', params);
}

export function notifyCombatTabSwitch(matchId: string, userId: string) {
  const socket = getCombatSocket();
  socket.emit('combat:tab-switch', { matchId, userId });
}

export type CombatSocket = Socket & {
  on(
    event: 'combat:match-found',
    cb: (payload: CombatMatchFoundPayload) => void,
  ): CombatSocket;
  on(
    event: 'combat:timer-sync',
    cb: (payload: CombatTimerSyncPayload) => void,
  ): CombatSocket;
  on(
    event: 'combat:opponent-progress',
    cb: (payload: CombatOpponentProgressPayload) => void,
  ): CombatSocket;
  on(
    event: 'combat:submission-result',
    cb: (payload: CombatSubmissionResultPayload & { error?: string }) => void,
  ): CombatSocket;
  on(
    event: 'combat:match-end',
    cb: (payload: CombatMatchEndPayload) => void,
  ): CombatSocket;
};

