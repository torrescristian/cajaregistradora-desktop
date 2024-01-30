import React, { useState } from 'react';
import Picker from '@emoji-mart/react';

interface IProps {
  onChange: (emoji: string) => void;
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string | null) => void;
}

const EmojiSelector = ({
  onChange,
  selectedEmoji,
  setSelectedEmoji,
}: IProps) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const toggleEmojiPicker = () => {
    setSelectedEmoji(null);
    setShowEmojis(!showEmojis);
  };

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setShowEmojis(false);
    onChange(emoji.native);
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <button
        className="btn btn-secondary w-min whitespace-nowrap"
        onClick={toggleEmojiPicker}
      >
        Seleccionar Emoji 😀
      </button>
      {showEmojis && (
        <div>
          <Picker onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      {selectedEmoji && (
        <p className="text-xl">
          <span className="opacity-60">Emoji seleccionado:</span>{' '}
          {selectedEmoji}
        </p>
      )}
    </div>
  );
};

export default EmojiSelector;
