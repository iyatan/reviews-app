interface StatusMessageProps {
  message: string;
}

const StatusMessage = ({ message }: StatusMessageProps) => {
  return (
    <div className="flex justify-center items-center h-screen p-[25%]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
    </div>
  );
};

export default StatusMessage;
