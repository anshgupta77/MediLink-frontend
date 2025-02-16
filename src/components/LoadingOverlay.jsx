import { Loader2 } from "lucide-react";
const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-xs z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 flex items-center gap-3">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span className="text-primary">Processing...</span>
      </div>
    </div>
  );

export default LoadingOverlay;