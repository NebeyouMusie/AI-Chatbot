import { useEffect, useRef } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast({
        description: "Message copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        description: "Failed to copy message",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const renderMessageContent = () => {
    // Check if the message contains code (basic detection)
    if (message.includes("```")) {
      const parts = message.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a code block
          const language = part.split("\n")[0].trim();
          const code = part
            .split("\n")
            .slice(1)
            .join("\n")
            .trim();
          return (
            <div key={index} className="my-2">
              <SyntaxHighlighter
                language={language || "javascript"}
                style={theme === "dark" ? vs2015 : vs}
                className="rounded-md"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        } else {
          // This is regular text
          return (
            <p key={index} className="whitespace-pre-wrap">
              {part}
            </p>
          );
        }
      });
    }

    return <p className="whitespace-pre-wrap">{message}</p>;
  };

  return (
    <div
      ref={messageRef}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-message-fade-in`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 relative group ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {renderMessageContent()}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};