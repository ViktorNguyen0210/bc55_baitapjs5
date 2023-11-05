export function fetchData() {
  return axios({
    url: "https://6540605745bedb25bfc1d39d.mockapi.io/Person",
    method: "GET",
  });
}
export function addPerson(person) {
  return axios({
    url: "https://6540605745bedb25bfc1d39d.mockapi.io/Person",
    method: "POST",
    data: person,
  });
}
export function delPerson(id) {
  return axios({
    url: `https://6540605745bedb25bfc1d39d.mockapi.io/Person/${id}`,
    method: "DELETE",
  });
}

export function getPersonByID(id) {
  return axios({
    url: `https://6540605745bedb25bfc1d39d.mockapi.io/Person/${id}`,
    method: "GET",
  });
}

export function updatePerson(person) {
  return axios({
    url: `https://6540605745bedb25bfc1d39d.mockapi.io/Person/${person.id}`,
    method: "PUT",
    data: person,
  });
}
