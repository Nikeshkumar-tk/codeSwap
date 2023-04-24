export function getVideoId(url: string): string | null {
    const regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }



  