using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleDatabase.Data;

namespace ReactPeopleDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

		private IHostingEnvironment _environement;
		private string _connectionString;


		public PeopleController(IConfiguration configuration, IHostingEnvironment environment)
		{
			_connectionString = configuration.GetConnectionString("ConStr");
			_environement = environment;
		}
		[Route("addPerson")]
		[HttpPost]
		public void AddPerson(Person personToAdd)
		{
			PeopleRepository repos = new PeopleRepository(_connectionString);
			repos.AddPerson(personToAdd);
		}

		[Route("getPeople")]
		[HttpGet]
		public IEnumerable<Person> GetPeople()
		{
			PeopleRepository repos = new PeopleRepository(_connectionString);
			return repos.GetPeople();
		}

	}
}