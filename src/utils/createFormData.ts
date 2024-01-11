export const createFormData = <T extends object>(data: T) => {
  const formData = new FormData();

  for (const key in data) {
    switch (key) {
      case 'title': {
        if (typeof data[key] === 'string') {
          formData.append('title', data[key] as string);
        } else {
          formData.append('title', JSON.stringify(data[key]));
        }
        break;
      }
      case 'image': {
        if (data[key] !== 'null') {
          formData.append('image', data[key] as File);
        }
        break;
      }
      default: {
        formData.append(key, data[key] as string);
      }
    }
  }

  return formData;
};
