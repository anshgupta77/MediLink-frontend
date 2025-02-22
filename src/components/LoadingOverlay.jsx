// import { Loader2 } from "lucide-react";
// const LoadingOverlay = () => (
//     <div className="fixed inset-0 bg-[#130e3d] backdrop-blur-xs z-50 flex items-center justify-center">
//       <div className="bg-[#130e3d] rounded-lg p-4 flex items-center gap-3">
//         <Loader2 className="h-6 w-6 text-purple-600 animate-spin" />
//         <span className="text-purple-600 text-2xl">Processing...</span>
//       </div>
//     </div>
//   );

// export default LoadingOverlay;


import { Loader2 } from "lucide-react";
const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-[#130e3d]/30 backdrop-blur-xs z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 flex items-center gap-3">
        <Loader2 className="h-6 w-6 text-purple-700 animate-spin" />
        <span className="text-purple-700">Processing...</span>
      </div>
    </div>
  );

export default LoadingOverlay;
