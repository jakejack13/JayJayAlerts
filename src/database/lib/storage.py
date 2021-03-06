"""A collection of objects used in constructing the database found in the
    database node

    @author Jacob Kerr

    Classes
    -------
    Database
        A class representing a database
"""

from typing import Union

from .schema import FIELDS

DATABASEFILE = "/data/storage.db"
"""The file to load the database from and save the database to"""

class Database:
    """A class representing a database

    Fields
    ------
    fields: list[str]
        The list of fields that can be queried in the database"""

    def __init__(self, fields: list[str], savefile: str) -> None:
        """Creates a new Database object with the respective fields

        Params
        ------
        fields: list[str]
            the list of fields that can be queried in the database
            Precondition: the first element is the id field
        savefile: str
            The file to save the database
        """
        self.fields: list[str] = fields
        """The list of fields the can be queried in the database
            Invariant: the first element is the id field"""
        self.entries: dict[str, dict[str,str]] = {}
        """The entries in the database, accessed by id"""
        self.savefile: str = savefile
        """The file to save the database"""


    def add_entry(self, values: list[str]) -> bool:
        """Adds a new entry to the database

        Params
        ------
        values: list[str]
            the values to add in the entry in order of fields in the database

        Returns
        -------
        bool
            True if the entry was successfully added, false otherwise"""
        if len(values) != len(self.fields):
            return False
        entry = {}
        for i,_ in enumerate(values):
            entry[self.fields[i]] = values[i]
        self.entries[values[0]] = entry
        return True


    def get_value(self, entry_id: str, field: str) -> Union[str,None]:
        """Returns the value of a field for the entry of the given id

        Params
        ------
        entry_id: str
            the id of the entry
        field: str
            the field to get the value from

        Returns
        str | None
            the value of the field associated with the entry of the
            corresponding id or undefined if neither exist"""
        if entry_id not in self.entries or field not in self.fields:
            return None
        return self.entries[entry_id][field]


    def set_value(self, entry_id: str, field: str, value: str) -> bool:
        """Sets the value of a field for the entry of the given id

        Params
        ------
        entry_id: str
            the id of the entry
        field: str
            the field to get the value from
        value: str
            the value to set

        Returns
        -------
        bool
            True if the id and field are valid, False otherwise"""
        if entry_id not in self.entries or field not in self.fields:
            return False
        self.entries[entry_id][field] = value
        return True


    def is_value(self, field: str, value: str) -> bool:
        """Checks if any entry in the database contains the specified value in
        the specified field

        Params
        ------
        field: str
            the field to find the value at
        value: str
            the value to find

        Returns
        -------
        bool
            True if the value is found at that field, False otherwise"""
        if field not in self.fields:
            return False
        for entry in self.entries.values():
            if entry[field] == value:
                return True
        return False


    def get_field(self, field: str) -> Union[list[str], None]:
        """Returns a list of values from the specified field

        Params
        ------
        field: str
            the field to pull the value from

        Returns
        -------
        list[str] | None
            the values in the field or undefined if the field does not exist"""
        if field not in self.fields:
            return None
        result = []
        for entry in self.entries.values():
            result.append(entry[field])
        return result


    def get_entry(self, entry_id: str) -> Union[dict[str,str], None]:
        """Returns the list of values from the entry specified
        
        Params
        ------
        entry_id: str
            the id of the entry to get
        
        Returns
        -------
        dict[str,str] | None
            the key/value pairs in the entry or undefined if the entry does not
            exist
        """
        if entry_id not in self.entries.keys():
            return None
        return self.entries[entry_id]


    def save(self) -> None:
        """Saves the database to the database file"""
        with open(self.savefile, 'w', encoding='utf-8') as file:
            for entry in self.entries.values():
                for value in entry.values():
                    file.write(f"{value}\n")


    def __str__(self) -> str:
        return f"Fields:\n{self.fields}\nEntries:\n{self.entries}\nSave file:\n{self.savefile}\n"


def database_factory() -> Database:
    """Creates a new database stored at the database file as specified in this
    module

    Returns
    -------
    Database
        the newly created database"""
    database = Database(FIELDS, DATABASEFILE)
    with open(DATABASEFILE, 'r', encoding='utf-8') as file:
        for line in file:
            database.add_entry(line.split(','))
    return database
