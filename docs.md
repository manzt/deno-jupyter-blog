# National Gallery of Art Open Data Program: Collection Data in CSV Format

## Introduction

Thank you for your interest in data about the National Gallery of Art’s
collection. The comma separated value files contained on this GitHub site
represent a cross-section of public, fact-based data about our collection. They
contain an export of data about the NGA’s accessioned art objects, relationships
between those art objects, the creators of those objects, donors who helped the
NGA acquire the objects, the object’s provenance, and the public locations where
the collection can be viewed, as well as links to access audio and video about
the collection and people and images depicting the works. The NGA is releasing
these files under the Creative Commons Zero (CC0) designation. You are free to
use the data in any manner consistent with the CC0 designation. Please note that
while links to media files and images contained in this data are being released
under a CC0 designation, the content of the linked sites might still be
copyrighted. The NGA’s Open Access Policy, for example, applies to only a subset
of the images that are linked in this dataset.

The full dataset is updated frequently (usually once a day), and the date of a
particular CSV file can be confirmed by examining the last commit date reported
by GitHub.

We appreciate your feedback and questions about the NGA’s open data program and
are interested in learning about all the innovative ways that people are using
our data, so please let us know! The remainder of this document describes the
data elements comprising the CSV formatted open dataset.

### About Objects and Constituents:

Art Objects comprise collections and are therefore one of two typical starting
points for exploring a collection. The Object Identifier, a.k.a., “objectID” is
a unique sequential identifier assigned by the CMS system to each new art object
registered in the collection management system. The objectID is used to link
many tables with the objects table which is the core table of the collection.

Another equally important table is the constituents table. Similarly, a
constituentID is assigned by the CMS whenever a new party is defined in the
system. The relationship table “objects_constituents” holds important metadata
about the relationships between art objects and constituents and includes
several types of relationships such as art object creator and donor.

### Composite Art Objects:

The structure of art objects can be somewhat complex. While many objects are
comprised of a single physical part, other objects are comprised of multiple
parts, with either a conceptual relationship or a physical relationship, that
together make up the full cataloguing of the object. An object like a triptych
with 3 separate panels, might have 3 individual records to describe each panel,
but then another record to describe the triptych as a whole. Each panel would be
related to this record as a part of the whole, but function as a separate object
as well. In the case of multiple objects records that are physically part of a
single object from which they cannot be separated, like a medal or pages in a
bound volume, these records would be connected with an inseparable intellectual
child relationship. The child record(s) do not function independently from the
physical parent record. It is the decision of the collection management
specialist to decide how best to model art objects using the various options
available in the collection management system. This document focuses primarily
on a deeper description of composite objects, i.e. objects comprised of two or
more art objects.

### Art Object Modeling Terms:

#### Inseparable Intellectual Object

A single physical object with multiple intellectual parts, e.g. a coin where
each side has been cataloged separately as a logical object or a book where all
the pages are bound together. These objects cannot be physically separated from
one another. One part is designated the “Parent” object, and then any additional
parts would be designated inseparable Intellectual Objects. In the case of an
object with drawings on both sides (recto/verso), the primary image (recto)
would be designated the parent and then the secondary side (verso) would be
related as an inseparable intellectual child record. Separable Object

An object composed of multiple, separable parts, e.g. a painting that spans
three panels or a sculpture consisting of two physical parts.

#### Cover Record

An object record that represents a set of related physical or intellectual
objects, e.g. the overall book of etchings where each page is cataloged as a
separate object, an inseparable intellectual child object, or a record
describing the entire portfolio or series of prints, where each print is related
as a separable object, or a record that describes an entire altarpiece, where
each panel is related as a separable object.

#### Virtual Object

An object that does not itself constitute a physical collection object, e.g. a
portfolio of etchings, where there is no physical container –the cover record
describes the portfolio of prints as a whole, or a case where a cover record was
created for a diptych – the record describes the diptych as a whole, and the two
parts are related as separable objects, however the cover record does not
constitute a 3rd physical object. e.g. the cover of a book with etchings inside,
a box of loose-leaf drawings, etc. This status is recorded in the column
isVirtual in the objects table. There are currently no cases of virtual child
objects.

#### Physical Object

An object that, in its physical entirety, is a work of art, and can function
independently and separately from another object.

#### Physical Object Parent

The parent object record of an intellectual child object in an inseparable
relationship, e.g. head side of a coin. Inseparable (intellectual) objects have
a Physical Parent ID. Separable (physical) objects, with which inseparable
objects may be associated, do not have a Physical Parent ID (presumably because
they are physical objects themselves and so do not need this distinction). The
status of virtual on an object has nothing to do with physical parent object.

### Inter-Object Relationships:

Direct structural relationships between art objects are contained in the table
associations. When objects are related to one another, they are linked through
parent-child relationships and the relationship is characterized as being either
physically separable or inseparable.

#### Examples:

- Inseparable coins, one physical object as recto parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.139898.html
- Inseparable print, one physical object as recto parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.67361.html
- Inseparable drawing with cover record, e.g.
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.125203.html
- Inseparable portfolio with physical cover record parent, e.g.
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.76219.html
- Inseparable drawing with cover record as parent, e.g.
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.143762.html
- Inseparable two sided painting, physical parent (same situation as coins),
  e.g. http://www.nga.gov/content/ngaweb/Collection/art-object-page.50724.html
- Inseparable decorative art (four pieces) with one physical object chosen as
  parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.52354.html
- Separable decorative art with two pieces and one of them is physical parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.53152.html
- Separable panels with one panel as physical parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.2.html - left
  panel is parent
- Separable panels currently not associated with each other:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.282.html and
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.10.html
- Separable panels with one virtual cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.111637.html
- Separable portfolio with virtual cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.71729.html -
  parent should probably be virtual but is marked as physical
- Separable portfolio with physical cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.95381.html -
  example where cover can be considered a work itself
- Separable portfolio with virtual cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.163596.html
- Separable drawing with virtual cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.141579.html
- Separable sculpture with physical cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.130750.html -
  each side cataloged as separate object
- Separable volume with physical cover record parent:
  http://www.nga.gov/content/ngaweb/Collection/art-object-page.58003.html

### Data Dictionary:

Detailed descriptions of the data files and their elements:

This data dictionary contains the SQL required to define your own working
database in PostGreSQL should you choose to load and query the data using a
RDBMS.

Table, Column, and Type Description

CREATE TABLE alternative_identifiers	Alternative identifiers for NGA objects and
constituents. (

uuid character varying (64) NOT NULL,	universally unique identifier for an
instance of an NGA entity, e.g. an art object, image, artist, etc.\
idschemelabel character varying (64) NOT NULL,	key name for the identification
scheme to which identifier belongs, e.g. a “Wikidata ID” identifier character
varying (64) NOT NULL	The value of the identifier

)

CREATE TABLE constituents	A constituent is a single person or a group of persons
(see constituent type). Constituents in the extract typically have a
relationship with one or more objects in the public objects extract.
Relationships are defined in another table, but a constituent may be an artist,
an owner, or a donor, or all of these. we only use a limited number of anonymous
artists to represent all anonymous artists of works it is possible for some
fields, e.g. biography, to have embedded HTML italics tags – this is generally
true of about a dozen columns across various tables in the public collection
extract – in some cases underscores are used and in other cases simple HTML
markup is present

( constituentID integer NOT NULL PRIMARY KEY,	primary key (tms identifier)
uuid			nvarchar(36) NULL,	a persistent unique identifier for this constituent;
used as a key into other tables such as alternative numbers and will play a more
active role in linking constituents with other data sources moving forward
ULANID character varying(32) NULL,	Getty ULAN ID - partially applied to NGA
artists - not all artists are in ULAN and not all matches have been curated yet
preferredDisplayName character varying(256) NULL,	inverted full name of the
constituent - this is the NGA's preferred name for the constituent
forwardDisplayName character varying(256) NULL,	forward direction preferred full
name of the constituent lastName character varying(256) NULL,	preferred last
name of the constituent displayDate character varying(256) NULL,	birth and death
dates in human readable form artistOfNGAObject integer NOT NULL,	0 = not an
artist associated with an NGA accessioned object 1 = artist of an NGA
accessioned object beginYear integer NULL,	birth year endYear integer
NULL,	death year visualBrowserTimeSpan character varying(32) NULL,	computed
time-span slot for this artist's life nationality character varying(128)
NULL,	nationality of the artist - not all values are conforming
visualBrowserNationality character varying(128) NULL,	one of the top 25
normalized nationalities or "other" if outside of top 25 constituentType
character varying(30) NOT NULL,	 anonymous corporate couple individual
purchase_fund wikidataid character varying(64) NULL	Wikidata ID – partially
applied to NGA artists – not all artists in represented in Wikidata. )

CREATE TABLE constituents_altnames 	Alternative names used by or assigned to
constituents for various purposes as indicated by the nametype column. Curators
might prefer to use one name whereas the constituent might be referred to by in
other publications or sources by a different name.

( altnameid integer NOT NULL PRIMARY KEY,	primary key constituentid integer NOT
NULL,	foreign key to constituents table lastname character
varying(256),	alternate last name displayname character varying(256),	alternate
display name forwarddisplayname character varying(256),	alternate display name
forwards direction (first name followed by last name) nametype character
varying(32) NOT NULL,	type of alternate name; one of: Birth Name Full Name
Maiden Name Married Name Nickname/Pseudonym Original Name Preferred Name Spouse
Unicode Display Name Variant Variant Index Name );

CREATE TABLE constituents_text_entries	stores long texts associated with
constituents ( constituentID integer NOT NULL,	foreign key to constituents table
text character varying NOT NULL,	the text itself which may or may not contain
one of several embedded formatting adornments textType character varying(32) NOT
NULL,	currently only contains "bibliography" year character varying(4) NULL,	the
year the text was published )

CREATE TABLE locations	The location represents the physical public location of
an art object within the confines of the National Gallery of Art’s Washington,
D.C. campus. Note: when the gallery is partially or fully closed for an extended
period, such as an infrastructure project or the COVID-19 pandemic, some
locations might not be listed if they are currently closed to the public. Note
that object locations are defined at the unitPostion level (N, S, E, W, etc.),
so each wall in each room has a different location ID – this means the
description of the location might be duplicated multiple times for different
location IDs.

( locationID integer NOT NULL PRIMARY KEY,	foreign key to locations table site
character varying(64) NOT NULL,	currently either "East Building" or "West
Building”, the two primary sites of the NGA - Sculpture Garden is considered as
West Building . room character varying(64) NOT NULL,	the room within the site,
e.g. G-132 publicAccess integer NOT NULL,	0 = no public access 1 = public access
only public access locations are included in the files. description character
varying(256) NOT NULL,	full text description of the location, e.g. East Bldg,
Mezz Gal 214B (Pod 2) unitPosition character varying(64) NULL,	location within
the room, e.g. SOUTH LEDGE )

CREATE TABLE media_items	a table containing audio and video items published to
www.nga.gov

( mediaID bigint NOT NULL PRIMARY KEY,	numerical identifier for externally
managed media - BrightCove and SoundCloud are our media providers and they both
use large integers for media identifiers mediaType varchar(32) NOT NULL,	audio
or video title varchar(2048) NULL,	title of the media item description text
NULL,	HTML fragment description of the media item duration int NULL,	duration of
the media item in seconds (there could be manually entered errors in some of
these values) language varchar(12) NOT NULL,	two letter language without
localization, e.g. en, fr, zh thumbnailURL varchar(1024) NULL,	full URL to the
thumbnail playURL varchar(1024) NULL,	a URL that can be used to play the media
file directly downloadURL varchar(1024) NULL,	a URL that allegedly can be used
to download the media file directly (no option for brightcove so many nulls)
keywords varchar(2048) NULL,	a list of non-vocabulary-controlled keywords
assigned to the media item internally tags varchar(2048) NULL,	a list of AEM
tags assigned to the media item by authors imageURL varchar(1024) NULL,	similar
to thumbnail, but for a full-size image presentationDate timestamp with time
zone NULL,	the presentation date of an event represented by this media
releaseDate timestamp with time zone NULL,	publication date lastModified
timestamp with time zone NULL,	last modification date of the media item )

CREATE TABLE media_relationships	records relationships between media items and
core NGA art entities

( mediaID bigint NOT NULL,	foreign key to media items table relatedID bigint NOT
NULL,	foreign key into the relevant table for the relatedEntity relatedEntity
varchar(32) NOT NULL,	the related entity, currently either
nga:art:tms:constituents or nga:art:tms:objects PRIMARY KEY(mediaID, relatedID,
relatedEntity)	the composite primary key for this table )

CREATE TABLE object_associations	relationships between art objects - see
accompanying documentation about types of art objects and relationships between
them

( parentObjectID integer NOT NULL,	the object ID of this object's parent if it
has one; foreign key into objects table childObjectID integer NOT NULL,	the
object ID of this object's child if is has any; foreign key into objects table
relationship character varying(32) NOT NULL,	inseparable or separable - refers
to the physical separability of the two objects PRIMARY KEY(parentObjectID,
childObjectID, relationship)	the composite primary key for this table )

CREATE TABLE objects_altnums	relationships between art objects - see
accompanying documentation about types of art objects and relationships between
them

( objectid integer NOT NULL,	foreign key to the objects table altnumtype
character varying(64) NOT NULL,	type of alternative number, e.g. Stieglitz
Estate Number altnum character varying(64) NOT NULL,	the alternative number
itself )

CREATE TABLE objects_constituents	One of the most important elements of the
extract, the object / constituent relationships describe the association between
a constituent and an object.

( objectID integer NOT NULL,	foreign key to the objects table constituentID
integer NOT NULL,	foreign key to the constituents table displayOrder integer NOT
NULL,	order in which to display the list of constituent relationships for a
given object roleType character varying(64) NOT NULL,	currently includes
"artist", "donor", and "owner" role types role character varying(64) NOT
NULL,	for each role type, there are specific roles, e.g. for artist, one of the
roles is "painter" prefix character varying(64) NULL,		text prefix associated
with the relationship / transaction suffix character varying(64) NULL,		text
suffix associated with the relationship / transaction displayDate character
varying(128) NULL,	human readable date(s) associated with the relationship /
transaction beginYear integer NULL,	four digit year when the relationship /
transaction started endYear integer NULL,	four digit year when the relationship
/ transaction ended country character varying(64) NULL,	the full country name
where the relationship / transaction occurred zipCode character varying(16)
NULL,	the postal code where the relationship / transaction occurred )

CREATE TABLE objects_dimensions	records various dimensions for objects

( objectID integer NOT NULL,	foreign key to the objects table element character
varying(32) NOT NULL,	a qualifier for the object element to which the dimension
applies - does not yet conform to a controlled vocabulary dimensionType
character varying(32) NOT NULL,	the type of measurement, e.g. width, height,
diameter dimension decimal(22,10) NOT NULL,	the numerical measurement itself,
e.g. 21.22 unitName character varying(32) NOT NULL,	the units of the
measurement, e.g. centimeters, grams, pounds, etc. )

CREATE TABLE objects_historical_data	records a very light audit trail for
certain important object properties (

    dataType                    character varying(32) NOT NULL,	currently either "previous_attribution" or "previous_title"
    objectID                    integer NOT NULL,	foreign key to the objects table
    displayOrder                integer NOT NULL,	the preferred order in which to display the historical values for a given object and data type
    forwardText                 character varying NULL,	the historical attribution record value, forward facing
    invertedText                character varying NULL,	the historical attribution record value, inverted
    remarks                     character varying NULL,	remarks associated with the record
    effectiveDate               character varying(10) NULL,	a human readable date associated with the record

)

CREATE TABLE objects	Art objects are a core entity of the collection extract.
Objects are physical or logical constructs and all but a very small number of
them in this extract are NGA objects with accession numbers.

Imagery for an object should not be displayed unless the canShowImagery flag is
1

If an image copyright exists, it must always be displayed with each image of the
object

There can be multiple images per object

The begin and end dates are provided to facilitate returning the object via
search, but they are no foolproof. For example, when the displayDate is unset,
usually the begin and end dates are the artist’s life dates since that’s the
best information available.

Underscores appearing in nvarchar columns should be treated as an italicizing
markup, e.g., _title_ => title

( objectID integer NOT NULL PRIMARY KEY,	the primary identifier for an art
object - identifier is created by the NGA's collection management system (tms);
primary key for the table uuid			nvarchar(36) NULL,	a persistent unique
identifier for this art object; used as a key into other tables such as
alternative numbers and will play a more active role in linking the art object
with other data sources moving forward accessioned integer NOT NULL,	0 | 1 flag
indicating whether this object is an NGA accessioned work - for the public
collection extract, this should always be 1 accessionNum character varying(32)
NULL,	accession number assigned to an art object - art objects that are not
accessioned works do not begin with a year - otherwise, the vast majority of NGA
art object accession numbers are formatted with a numbering system starting with
the year, then followed by an accession lot, and finally ordering within that
lot, e.g. 1942.2.1 - depending on the complexity of an art object these can be
more complicated objectLeonardoID character varying(16) NULL,	prior legacy CMS
sytem id - might consider moving these to the historical_data table or the
object_altnums table locationID integer NULL,	location identifier corresponding
to the current location of the primary component of the art object title
character varying(2048) NULL,	title of the art object displayDate character
varying(256) NULL,	human readable date corresponding to the creation timeframe
of the object beginYear integer NULL,	computer readable year corresponding to
the creation start year of the object endYear integer NULL,	computer readable
year corresponding to the creation finish year of the object
visualBrowserTimeSpan character varying(32) NULL,	a computer-generated timeframe
slot assigned based on the begin and end year medium character varying(2048)
NULL,	materials comprising the art object dimensions character varying(2048)
NULL,	human readable dimensions of the art object inscription character varying
NULL,	text description of writings by the artist appearing on the art object and
where they appear markings character varying NULL,	text description of other
visual marks appearing on the art object and where they appear
attributionInverted character varying(1024) NULL,	text describing the artist(s)
primarily attributed with creating the work, inverted attribution character
varying(1024) NULL,	text describing the artist(s) primarily attributed with
creating the work creditLine character varying(2048) NULL,	acknowledgement of
credit to constituents who provided or funded the acquisition of the art object
classification character varying(64) NULL,	type of art object subClassification
character varying(64) NULL,	sub-type of art object visualBrowserClassification
character varying(32) NULL,	slightly cleaned up / normalized and computed
classification for the art object based on certain types of transformations and
peculiarities with the original classifications assigned to art objects
provenanceText character varying(max) NULL,	the provenance of this art object
described as a block of descriptive text – see also: objects_constituents where
roletype is ‘owner’ for change of ownership records (when available) parentID
integer NULL,	parent object if one exists and foreign key to another row in this
table isVirtual integer NOT NULL,	0 | 1 flag indicating whether this art object
is a "virtual" object or not - see accompanying documentation for a description
of what constituents a "virtual" object departmentAbbr character varying(32) NOT
NULL,	abbreviation for the NGA department with curatorial responsibility for
this art object; for a list of NGA curatorial departments, please contact the
NGA portfolio character varying(2048) NULL,	portfolio associated with this art
object for art objects associated with portfolios series character varying(850)
NULL,	series associated with this art object for art objects associated with
series volume character varying(850) NULL,	volume associated with this art
object for art objects associated with volumes watermarks character varying(512)
NULL,	description of any watermarks that are present on the art object
lastDetectedModification timestamp with time zone NULL,	datetime stamp of the
last detected modification of this object in the source system wikidataid
character varying (64) NULL,	Wikidata ID for NGA object. Not all objects are
represented in Wikidata. customPrintURL character varying(2048) NULL	if a custom
print is available for an art object, this is the url for starting the process
to order such a print )

CREATE TABLE objects_terms	relationships between terms and objects

The term column might contain embedded italics tags although this is rare

( termID integer NOT NULL,	original term identifier in the collection management
system; foreign key to terms_used table and terms_all table objectID integer NOT
NULL,	foreign key to the objects table termType character varying(64) NOT
NULL,	type of term, current consists of: Keyword Place Executed School Style
Systematic Catalogue Volume Technique Theme none of these terms are currently
mapped to open controlled vocabularies like Getty AAT or Getty TGN - we hope to
get there in the not so distant future as well as to tag all of our objects more
robustly term character varying(256) NULL,	the actual term visualBrowserTheme
character varying(32) NULL,	a normalized theme that might be used on the public
web site - should be re-modeled as a different term type visualBrowserStyle
character varying(64) NULL,	a normalized style used on the public web site -
should be re-modeled as a different term type )

CREATE TABLE objects_text_entries	stores long texts associated with objects

( objectID integer NOT NULL,	foreign key to objects table text character varying
NOT NULL,	the text itself which may or may not contain one of several embedded
formatting adornments textType character varying(32) NOT NULL,	currently one of:
bibliography brief_narrative conservation_note documentary_labels_inscriptions
exhibition_history exhibition_history_footnote inscription_footnote
lifetime_exhibition other_collections systematic_catalogue year character
varying(4) NULL,	the year the text was published )

CREATE TABLE preferred_locations	public locations that are defined by content
editors of the public web site - these are the preferred location descriptions
and are geared for public consumption - they differ somewhat from the values in
the collection management system

( locationKey character varying(32) NOT NULL,	a unique key that is a shorthand
abbreviation for the public location (should probably be the primary key since
one is not defined) locationType character varying(32) NOT NULL,	"room",
"floor", or "building" description character varying(512) NOT NULL,	preferred
public facing description for the public location isPublicVenue integer NOT
NULL,	0 | 1 flag indicating whether the public location is also used for public
events, e.g. East Building Auditorium mapImageURL character varying(1024)
NULL,	full url to a map image on the public web site containing this location
mapShapeType character varying(32) NULL,	type of shape defined by map shape
coords, currently one of: "poly", "rect", "circle" mapShapeCoords character
varying(1024) NULL,	CSV fragment defining a sequence of x,y coordinates defining
the outline of the location on the map image partof character varying(32)	This
preferred location is part of another location referenced by this locationKey
which is a key back into the same preferred_locations table – this enables the
hierarchy of locations to be expressed in the data )

CREATE TABLE preferred_locations_tms_locations	mapping between collection
management system location IDs and preferred location keys

( preferredLocationKey character varying(32) NOT NULL,	lookup key to
preferred_locations table tmsLocationID integer NOT NULL,	foreign key to
locations table which is based on CMS location IDs PRIMARY
KEY(preferredLocationKey, tmsLocationID)	composite primary key )

CREATE TABLE published_images Images that have been published to NGA web
properties either because the NGA owns the copyright or the images are being
displayed in a much smaller resolution than the original images under fair use
doctrine

( uuid character varying(64) NOT NULL PRIMARY KEY,	A unique and persistent GUID
for the image generated by the NGA’s web image publication system and stored in
the digital asset management system iiifURL character varying(512).		The base
IIIF URL for the image (see https://iiif.io/api/image/2.1/ to access the image
using the IIIF Image API) iiifThumbURL character varying(512).		An example of
the IIIF URL for the image that generates a small thumbnail sized to fit in a
200x200 pixel box viewtype character varying(32), 		One of “primary” or
“alternate” – primary represents a primary view of an art object. Alternate
represents an alternate view, typically from another angle, e.g., images from
all angles around a sculpture sequence character varying(32),		The order by
which to sort images for a given subject, e.g., sequence of images around a
sculpture would result in a rotational view around the sculpture. width
integer,				The full width of the IIIF source image if it is viewed at the
highest zoom level and reassembled into a single image height integer,				The
full width of the IIIF source image if it is viewed at the highest zoom level
and reassembled into a single image maxpixels integer,				A limitation used to
enforce fair use doctrine. When the width and height are larger than the max
pixels setting, the image server will only permit sourcing of IIIF services from
an image resized to fit within a box of this dimension. A customer might request
a larger image to be produced via IIIF, but the resulting image will blur as the
size increases since the source image size is restricted. created timestamp with
time zone,	Indicates the creation date of the actual source image uploaded to
the NGA’s digital asset management system modified timestamp with time
zone,	Indicates the modification date of the image metadata record in the
digital asset management system – dates tend to be more recent due to automated
updates to metadata depictstmsobjectid integer,				Records the Object ID in
cases where the image depicts an art object stored in the CMS assistivetext
text,					Records text that would be useful to the visually impaired when used
in combination with an assistive device list a screen reader );
