using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactPeopleDatabase.Data
{
	public class PeopleRepository
	{
		private readonly string _connectionString;

		public PeopleRepository(string connectionString)
		{
			_connectionString = connectionString;
		}

		public IEnumerable<Person> GetPeople()
		{
			using (var context = new PeopleContext(_connectionString))
			{
				return context.People.ToList();
			}
		}

		public void AddPerson(Person person)
		{
			using (var context = new PeopleContext(_connectionString))
			{
				context.People.Add(person);
				context.SaveChanges();
			}
		}

		public void DeletePeople(IEnumerable<int> ids)
		{
			using (var context = new PeopleContext(_connectionString))
			{
				var people = ids.Select(i => new Person { Id = i });
				context.People.RemoveRange(people);
				context.SaveChanges();
			}
		}
	}
}
