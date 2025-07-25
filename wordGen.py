import nltk
nltk.download('words')
from nltk.corpus import words

def get_5_letter_words():
    """Extract all 5-letter words using NLTK corpus"""
    # Download the words corpus if not already downloaded
    try:
        nltk.data.find('corpora/words')
    except LookupError:
        print("Downloading NLTK words corpus...")
        nltk.download('words')
    
    # Get all words from NLTK corpus
    word_list = words.words()
    
    # Filter for 5-letter words (only alphabetic characters)
    five_letter_words = [word.lower() for word in word_list 
                        if len(word) == 5 and word.isalpha()]
    
    # Remove duplicates and sort alphabetically
    five_letter_words = sorted(set(five_letter_words))
    
    return five_letter_words

def save_words_to_file(words, filename="5_letter_words.txt"):
    """Save the word list to a text file"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            for word in words:
                f.write(word + '\n')
        
        print(f"Successfully saved {len(words)} words to {filename}")
        
    except Exception as e:
        print(f"Error saving to file: {e}")

def main():
    """Main function to extract and save 5-letter words"""
    print("Extracting 5-letter English words using NLTK...")
    
    # Get words using NLTK
    five_letter_words = get_5_letter_words()
    print(f"Found {len(five_letter_words)} unique 5-letter words")
    
    # Save to file
    save_words_to_file(five_letter_words, "5_letter_words.txt")
    
    # Show some examples
    print(f"\nFirst 10 words: {five_letter_words[:10]}")
    print(f"Last 10 words: {five_letter_words[-10:]}")

if __name__ == "__main__":
    main()