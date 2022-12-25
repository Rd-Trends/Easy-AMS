import create from "zustand";
import axios from "axios";
import { user, record } from "../interface";

interface AttendanceStore {
  allParticipants: user[];
  participants: user[];
  participantsPercentage: Map<string, number>;
  setParticipants: (tableOffset: number, endOffset: number) => void;
  setAllParticipants: (data: user[]) => void;
  records: record[];
  setRecords: (record: record[]) => void;
  createNewRecord: (
    title: string,
    attendanceId: string,
    cb: () => void
  ) => void;
  toggleRecordStatus: (id: string, active: string) => void;
  addParticipantsToRecord: (recordId: string, participant: user) => void;
  deleteRecord: (recordId: string) => void;
}

const convertObjectToMap = (record: record) => {
  const participants = new Map<string, string>(
    Object.entries(record.participants!)
  );
  return { ...record, participants };
};

const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  allParticipants: [],
  participants: [],
  participantsPercentage: new Map(),
  records: [],
  setParticipants: (tableOffset, endOffset) =>
    set({ participants: get().allParticipants.slice(tableOffset, endOffset) }),
  setAllParticipants: (data) => set({ allParticipants: data }),
  setRecords: (records) => {
    const newRecords = records.map((record) => {
      return convertObjectToMap(record);
    });
    set({ records: newRecords });
  },
  createNewRecord: async (title, attendanceId, cb) => {
    const response = await axios.post("/api/record", {
      title,
      attendanceId,
    });
    if (response.data) {
      set({ records: [...get().records, convertObjectToMap(response.data)] });
      cb();
    }
  },
  toggleRecordStatus: async (id, active) => {
    const response = await axios.patch(`/api/record/${id}`, {
      active,
    });
    if (response.status === 200) {
      let newRecords = get().records.map((record) => {
        if (record._id === id) {
          record.active = active === "true" ? true : false;
        }
        return record;
      });
      set({ records: newRecords });
    }
  },
  addParticipantsToRecord: async (recordId, participant) => {
    const response = await axios.patch(`/api/record/${recordId}`, {
      participantId: participant._id,
      participantFullName: participant.fullName,
    });
    if (response.status === 200) {
      let newRecords = get().records.map((record) => {
        if (record._id === recordId) {
          record = convertObjectToMap(response.data);
        }
        return record;
      });
      set({ records: newRecords });

      if (!get().allParticipants.find((user) => user._id === participant._id)) {
        set({ allParticipants: [...get().allParticipants, participant] });
      }
    }
  },
  deleteRecord: async (recordId) => {
    const response = await axios.delete(`/api/record/${recordId}`);
    if (response.status === 200) {
      set({
        records: get().records.filter((record) => record._id !== recordId),
      });
    }
  },
}));

export default useAttendanceStore;
