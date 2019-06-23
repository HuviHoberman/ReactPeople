using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleDatabase.Data
{
	public class PeopleContext : DbContext
	{
		private string _connectionString;

		public PeopleContext(string connectionString)
		{
			_connectionString = connectionString;
		}

		public DbSet<Person> People { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(_connectionString);
		}
			}
}
