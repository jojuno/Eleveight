USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[LanguageType_Update]    Script Date: 9/11/2018 9:57:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Update a language type>
-- =============================================
ALTER PROCEDURE [dbo].[LanguageType_Update]
	-- Add the parameters for the stored procedure here
	@Id int,
	@TypeName nvarchar(50),
	@TypeDescription nvarchar(150)
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[LanguageType_Update]
		@Id = 3,
		@TypeName = N'French',
		@TypeDescription = N'French language'

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Update dbo.LanguageType
	set TypeName = @TypeName,
	TypeDescription = @TypeDescription
	where Id = @Id
END
