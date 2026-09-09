export interface LinkStudentResponse {
  message: string;
  student: {
    id: string;
    name: string;
    mosqueName: string;
    circleName: string;
  };
}

